exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.text("details");
    table.string("status");
    table.string("payment");
    table.text("description");
    table.string("total_price");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("create_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("orders");
