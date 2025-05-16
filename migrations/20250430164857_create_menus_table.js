/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('menus', function(table) {
        table.text('title');
        table.enum('is_default',['active','inactive']);
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('menus');

};
