const db = require('../../config/database');

class MysqlRepositoryConcrete {
  constructor(table, hasSoftDelete = true) {
    this.table = table;
    this.query = db(table);
    this.hasSoftDelete = hasSoftDelete;
  }

  // Base query builder
  getBaseQuery() {
    return db(this.table);
  }

  // Add soft delete condition to query
  addSoftDeleteCondition(query) {
    if (!this.hasSoftDelete) return query;
    return query.whereNull('deleted_at');
  }

  // Add soft delete condition to query (with trashed)
  addWithTrashedCondition(query) {
    if (!this.hasSoftDelete) return query;
    return query;
  }

  // Get all records
  async all(columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery().select(columns);
    
    if (!this.hasSoftDelete) {
      return query;
    }

    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    );
  }

  // Create a new record
  async create(data) {
    const [id] = await db(this.table).insert(data);
    return id;
  }

  // Find a record by ID
  async find(id, columns = ['*']) {
    const query = this.getBaseQuery()
      .select(columns)
      .where({ id });

    if (!this.hasSoftDelete) {
      return query.first();
    }

    return this.addSoftDeleteCondition(query).first();
  }

  // Find a record by specific column
  async findBy(column, value, columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery()
      .select(columns)
      .where(column, value);

    if (!this.hasSoftDelete) {
      return query.first();
    }

    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    ).first();
  }

  // Get records with where conditions
  async where(conditions, columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery()
      .select(columns)
      .where(conditions);
    
    if (!this.hasSoftDelete) {
      return query;
    }

    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    );
  }

  // Get first record matching conditions
  async firstWhere(conditions, columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery()
      .select(columns)
      .where(conditions);

    if (!this.hasSoftDelete) {
      return query.first();
    }

    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    ).first();
  }

  // Update a record
  async update(id, data) {
    if (this.hasSoftDelete) {
      data.updated_at = new Date();
    }
    return await db(this.table)
      .where({ id })
      .update(data);
  }

  // Soft delete a record
  async delete(id) {
    if (!this.hasSoftDelete) {
      throw new Error(`Table ${this.table} does not support soft delete`);
    }
    return await db(this.table)
      .where({ id })
      .update({ deleted_at: new Date() });
  }

  // Force delete a record
  async forceDelete(id) {
    if (!this.hasSoftDelete) {
      throw new Error(`Table ${this.table} does not support force delete`);
    }
    return await db(this.table)
      .where({ id })
      .del();
  }

  // Restore a soft deleted record
  async restore(id) {
    if (!this.hasSoftDelete) {
      throw new Error(`Table ${this.table} does not support restore`);
    }
    return await db(this.table)
      .where({ id })
      .update({ deleted_at: null });
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
      .first();
  }

  // Find a record by specific column
  async findBy(column, value, columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery()
      .select(columns)
      .where(column, value);

    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    ).first();
  }

  // Get all records
  async all(columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery().select(columns);
    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    );
  }

  // Get records with where conditions
  async where(conditions, columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery()
      .select(columns)
      .where(conditions);
    
    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    );
  }

  // Get first record matching conditions
  async firstWhere(conditions, columns = ['*'], withTrashed = false) {
    const query = this.getBaseQuery()
      .select(columns)
      .where(conditions);

    return (withTrashed ? 
      this.addWithTrashedCondition(query) : 
      this.addSoftDeleteCondition(query)
    ).first();
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
    return this.all(columns, true);
  }

  // Find a record by ID including soft deleted ones
  async findWithTrashed(id, columns = ['*']) {
    return this.findBy('id', id, columns, true);
  }

  // Restore a soft deleted record
  async restore(id) {
    return await db(this.table)
      .where({ id })
      .update({ deleted_at: null });
  }
}

module.exports = MysqlRepositoryConcrete;