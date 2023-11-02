const knex = require("../../database/knex");

class IngredientUpdateServices {
  constructor(IngredientsRepository) {
    this.IngredientsRepository = IngredientsRepository;
  }

  async execute(updateIngredients, dish_id) {
    const ingredients = await knex("ingredients").where({ dish_id });
    console.log(ingredients);
  }
}

module.exports = IngredientUpdateServices;
