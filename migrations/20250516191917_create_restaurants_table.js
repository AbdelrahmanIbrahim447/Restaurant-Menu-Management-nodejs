/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('resturants', function(table) {
        table.increments('id').primary();
        table.string('title');
        table.text('description').nullable;
        table.text('location').nullable;
        table.integer('user_id').unsigned();
      table
        .foreign('user_id')
        .references('users.id');

        table.timestamps(true, true); // creates created_at and updated_at
        table.timestamp('deleted_at').nullable();

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('resturants');
  
};
