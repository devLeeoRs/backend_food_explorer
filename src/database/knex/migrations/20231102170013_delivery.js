exports.up = (knex) =>
  knex.schema.createTable("delivery", (table) => {
    table.increments("id");
    table.string("address");
    table.string("status");
    table.text("description");
    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table.timestamp("create_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("delivery");
