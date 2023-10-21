const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    return await knex("users").where({ email });
  }

  async userCreate(name, email, password) {
    return await knex("users").insert({ name, email, password });
  }
}

module.exports = UserRepository;
