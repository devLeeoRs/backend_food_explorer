const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "food_db",
      user: "postgres",
      password: "91617915",
      host: "localhost",
      port: 5434,
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },
};
