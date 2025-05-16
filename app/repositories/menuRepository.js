const db = require('../../config/database');

class MenuModel {
  // Only fetch non-deleted records by default
  static async all() {
    const [rows] = await db.query(`
      SELECT * FROM menus 
      WHERE deleted_at IS NULL
    `);
    return rows;
  }

  // Include deleted records when needed
  static async allWithTrashed() {
    const [rows] = await db.query('SELECT * FROM menus');
    return rows;
  }

  // Only find non-deleted records by default
  static async find(id) {
    const [rows] = await db.query(`
      SELECT * FROM menus 
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    return rows[0];
  }

  // Find including soft-deleted records
  static async findWithTrashed(id) {
    const [rows] = await db.query('SELECT * FROM menus WHERE id = ?', [id]);
    return rows[0];
  }

  // Soft delete implementation
  static async delete(id) {
    await db.query(`
      UPDATE menus 
      SET deleted_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    return this.findWithTrashed(id);
  }

  // Restore soft-deleted record
  static async restore(id) {
    await db.query(`
      UPDATE menus 
      SET deleted_at = NULL 
      WHERE id = ? AND deleted_at IS NOT NULL
    `, [id]);
    return this.find(id);
  }

  // Force delete (permanent)
  static async forceDelete(id) {
    const menu = await this.findWithTrashed(id);
    await db.query('DELETE FROM menus WHERE id = ?', [id]);
    return menu;
  }

  // Other methods remain the same...
}

module.exports = MenuModel;