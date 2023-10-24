const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    return await knex("users").where({ email });
  }

  async userCreate(name, email, password) {
    return await knex("users").insert({ name, email, password });
  }

  async findById(id) {
    return await knex("users").where({ id });
  }

  async update(user, id) {
    await knex("users").where({ id }).update(user);
  }

  async delete(id) {
    await knex("users").where({ id }).delete();
  }
}

module.exports = UserRepository;
