const db = require('../../config/database');
const config = require('../../config/app');
const jwt = require('jsonwebtoken');
const MysqlRepositoryConcrete = require('./mysqlRepositoryConcrete');

const publicProp = ['id','username','email','created_at','updated_at'];

class UserRepository {
  constructor() {
    this.repository = new MysqlRepositoryConcrete('users',false);
  }

  // CRUD Operations
  async create({ username, email, password }) {
    return await this.repository.create({
      username,
      email,
      password
    });
  }

  async find(id, columns = publicProp) {
    return await this.repository.find(id, columns);
  }

  async findByUsername(username) {
    return await this.repository.findBy('username', username);
  }

  async findByEmail(email) {
    return await this.repository.findBy('email', email);
  }

  async findByColumn(column, value, select = publicProp) {
    return await this.repository.findBy(column, value, select);
  }

  async update(id, data) {
    return await this.repository.update(id, data);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  // Soft Delete Operations
  async forceDelete(id) {
    return await this.repository.forceDelete(id);
  }

  async restore(id) {
    return await this.repository.restore(id);
  }

  async findTrashed(id, columns = publicProp) {
    return await this.repository.findWithTrashed(id, columns);
  }

  // Query Operations
  async getAlls(columns = publicProp) {
    return await this.repository.all(columns);
  }

  async getAllsWithTrashed(columns = publicProp) {
    return await this.repository.allWithTrashed(columns);
  }

  async getsByConditions(conditions, columns = publicProp) {
    return await this.repository.where(conditions, columns);
  }

  async findByConditions(conditions, columns = publicProp) {
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