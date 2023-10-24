const knex = require("../database/knex");

class DishesRepository {
  async insertDish(user_id, name, price, description, stock_qtd) {
    return await knex("dishes").insert({
      user_id,
      name,
      price,
      description,
      stock_qtd,
    });
  }

  async insertIngredients(dishIngredients) {
    return await knex("ingredients").insert(dishIngredients);
  }

  async insertCategory(user_id, dish_id, name) {
    await knex("category").insert({
      user_id,
      dish_id,
      name,
    });
  }

  async searchDishesById(id) {
    return await knex("dishes").where({ id });
  }

  async update(name, description, price, stock_qtd, dish) {
    return await knex("dishes").update({
      name: name ?? dish.name,
      description: description ?? dish.description,
      price: price ?? dish.price,
      stock_qtd: stock_qtd ?? dish.stock_qtd,
    });
  }

  async delete(id) {
    return await knex("dishes").where({ id }).delete();
  }

  async findByDishAndIngredients(search) {
    return await knex("dishes")
      .select([
        "dishes.id",
        "dishes.name",
        "dishes.price",
        "dishes.description",
        "dishes.photo_url",
      ])
      .whereLike("dishes.name", `%${search}%`)
      .orWhereLike("ingredients.name", `%${search}%`)
      .innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
      .orderBy("dishes.name")
      .groupBy("dishes.id");
  }
}

module.exports = DishesRepository;
