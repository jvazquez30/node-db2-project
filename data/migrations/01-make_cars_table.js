/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.createTable('cars', table => {
    table.increments('id')
    table.string('vin', 17).notNullable().unique()
    table.string('make', 100).notNullable()
    table.string('model', 100).notNullable()
    table.integer('mileage').notNullable()
    table.string('title', 100)
    table.string('transmission', 100)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.dropTableIfExists('cars')
};
