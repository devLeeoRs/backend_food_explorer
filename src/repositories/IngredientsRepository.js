const knex = require("../database/knex");

class IngredientsRepository {
  async update(id, name) {
    return await knex("ingredients").where({ id }).update({ name });
  }

  async delete(id) {
    return await knex("ingredients").where({ id }).delete();
  }

  async showIngredients(dish_id) {
    return await knex("ingredients").where({ dish_id });
  }
}
module.exports = IngredientsRepository;
