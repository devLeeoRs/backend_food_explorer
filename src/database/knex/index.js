const config = require("../../../knexfile");
const Knex = require("knex");

const connection = Knex(config.development);

module.exports = connection;
