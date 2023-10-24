exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("price").notNullable();
    table.text("description");
    table.integer("stock_qtd");
    table.string("photo_url");
  });

exports.down = (knex) => knex.schema.dropTable("dashes");
