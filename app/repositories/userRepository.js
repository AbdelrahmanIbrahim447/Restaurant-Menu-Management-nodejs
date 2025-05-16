const db = require('../../config/database');
const config = require('../../config/app');
const jwt = require('jsonwebtoken');
const MysqlRepositoryConcrete = require('./mysqlRepositoryConcrete');

const publicProp = ['id','username','email','created_at','updated_at'];

class UserRepository {
  constructor() {
    this.repository = new MysqlRepositoryConcrete('users');
  }

  // CRUD Operations
  async createUser({ username, email, password }) {
    return await this.repository.create({
      username,
      email,
      password
    });
  }

  async findUser(id, columns = publicProp) {
    return await this.repository.find(id, columns);
  }

  async findUserByUsername(username) {
    return await this.repository.findBy('username', username);
  }

  async findUserByEmail(email) {
    return await this.repository.findBy('email', email);
  }

  async findUserByColumn(column, value, select = publicProp) {
    return await this.repository.findBy(column, value, select);
  }

  async updateUser(id, data) {
    return await this.repository.update(id, data);
  }

  async deleteUser(id) {
    return await this.repository.delete(id);
  }

  // Soft Delete Operations
  async forceDeleteUser(id) {
    return await this.repository.forceDelete(id);
  }

  async restoreUser(id) {
    return await this.repository.restore(id);
  }

  async findTrashedUser(id, columns = publicProp) {
    return await this.repository.findWithTrashed(id, columns);
  }

  // Query Operations
  async getAllUsers(columns = publicProp) {
    return await this.repository.all(columns);
  }

  async getAllUsersWithTrashed(columns = publicProp) {
    return await this.repository.allWithTrashed(columns);
  }

  async getUsersByConditions(conditions, columns = publicProp) {
    return await this.repository.where(conditions, columns);
  }

  async findUserByConditions(conditions, columns = publicProp) {
    return await this.repository.firstWhere(conditions, columns);
  }

  // Authentication Methods
  generateToken(userId) {
    return jwt.sign({ id: userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }
}

module.exports = new UserRepository();