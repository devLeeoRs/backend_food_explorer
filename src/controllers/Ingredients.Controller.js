const knex = require("../database/knex");

const IngredientsRepository = require("../repositories/IngredientsRepository");
const IngredientUpdateServices = require("../services/ingredientsServices/ingredientUpdateService");

class ingredientsController {
  async update(request, response) {
    const { updateIngredients, dish_id } = request.body;

    const ingredientsRepository = new IngredientsRepository();
    const ingredientUpdateServices = new IngredientUpdateServices(
      ingredientsRepository
    );

    await ingredientUpdateServices.execute(updateIngredients, dish_id);

    response.json({ message: "ingredient updated successfully" });
  }

  async delete(request, response) {
    const { id } = request.params;

    const ingredientsRepository = new IngredientsRepository();
    await ingredientsRepository.delete(id);

    response.json({ message: "ingredient successfully deleted" });
  }

  async index(request, response) {
    const { dish_id } = request.params;

    const ingredientsRepository = new IngredientsRepository();
    const ingredients = await ingredientsRepository.showIngredients(dish_id);

    response.json(ingredients);
  }
}

module.exports = ingredientsController;
