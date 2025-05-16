/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('menus', function(table) {
      table.increments('id').primary();
      table.text('title');
      table.integer('user_id').unsigned();
      table
        .foreign('user_id')
        .references('users.id');

      table.integer('resturant_id').unsigned();
      table
        .foreign('resturant_id')
        .references('resturants.id');

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
