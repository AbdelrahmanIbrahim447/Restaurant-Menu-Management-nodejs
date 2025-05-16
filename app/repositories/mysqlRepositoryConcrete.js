const db = require('../../config/database');

class MysqlRepositoryConcrete {
  constructor(table) {
    this.table = table;
    this.query = db(table);
  }

  // Create a new record
  async create(data) {
    const [id] = await db(this.table).insert(data);
    return id;
  }

  // Find a record by ID
  async find(id, columns = ['*']) {
    return await db(this.table)
      .select(columns)
      .where({ id })
      .whereNull('deleted_at')
      .first();
  }

  // Find a record by specific column
  async findBy(column, value, columns = ['*']) {
    return await db(this.table)
      .select(columns)
      .where(column, value)
      .whereNull('deleted_at')
      .first();
  }

  // Get all records
  async all(columns = ['*']) {
    return await db(this.table)
      .select(columns)
      .whereNull('deleted_at');
  }

  // Update a record
  async update(id, data) {
    data.updated_at = new Date();
    return await db(this.table)
      .where({ id })
      .update(data);
  }

  // Soft delete a record
  async delete(id) {
    return await db(this.table)
      .where({ id })
      .update({ deleted_at: new Date() });
  }

  // Force delete a record
  async forceDelete(id) {
    return await db(this.table)
      .where({ id })
      .del();
  }

  // Get all records including soft deleted ones
  async allWithTrashed(columns = ['*']) {
    return await db(this.table)
      .select(columns);
  }

  // Find a record by ID including soft deleted ones
  async findWithTrashed(id, columns = ['*']) {
    return await db(this.table)
      .select(columns)
      .where({ id })
      .first();
  }

  // Restore a soft deleted record
  async restore(id) {
    return await db(this.table)
      .where({ id })
      .update({ deleted_at: null });
  }

  // Get records with where conditions
  async where(conditions, columns = ['*']) {
    return await db(this.table)
      .select(columns)
      .where(conditions)
      .whereNull('deleted_at');
  }

  // Get first record matching conditions
  async firstWhere(conditions, columns = ['*']) {
    return await db(this.table)
      .select(columns)
      .where(conditions)
      .whereNull('deleted_at')
      .first();
  }
}

module.exports = MysqlRepositoryConcrete;