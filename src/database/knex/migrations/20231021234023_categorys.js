exports.up = (knex) =>
  knex.schema.createTable("category", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table.string("name").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("category");
