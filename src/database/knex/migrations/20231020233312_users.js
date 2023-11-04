exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("phone");
    table.string("cpf");
    table.string("birth_date");
    table.string("avatar_url");
    table.string("address");
    table.string("address_number");
    table.string("address_area");
    table.string("city");
    table.string("zip_code");
    table
      .enum("role", ["admin", "customer", "delivery"], {
        useNative: true,
        enumName: "roles",
      })
      .notNullable()
      .default("customer");
  });

exports.down = (knex) => knex.schema.dropTable("users");
