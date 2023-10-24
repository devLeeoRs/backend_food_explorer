const knex = require("../database/knex");
const DishesRepository = require("../repositories/DishesRepository");
const DishesCreateService = require("../services/dishesServices/DishesCreateService");
const DishesUpdateService = require("../services/dishesServices/DishesUpdateService");
const DishesIndexService = require("../services/dishesServices/DishesIndexService");

class DishesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { name, description, price, stock_qtd, ingredients, category } =
      request.body;

    const dishesRepository = new DishesRepository();
    const dishesCreateService = new DishesCreateService(dishesRepository);
    await dishesCreateService.execute(
      name,
      description,
      price,
      stock_qtd,
      ingredients,
      category,
      user_id
    );

    response.json("✅ dish created successfully");
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, price, stock_qtd } = request.body;

    const dishesRepository = new DishesRepository();
    const dishesUpdateService = new DishesUpdateService(dishesRepository);
    await dishesUpdateService.execute(name, description, price, stock_qtd, id);

    response.json("✅ dish updated successfully");
  }

  async delete(request, response) {
    const { id } = request.params;

    const dishesRepository = new DishesRepository();
    await dishesRepository.delete(id);

    response.json("✅ dish delete successfully");
  }

  async index(request, response) {
    const { search } = request.body;

    const dishesRepository = new DishesRepository();
    const dishesIndexService = new DishesIndexService(dishesRepository);
    const filterByDishAndIngredients = await dishesIndexService.execute(search);

    response.json(filterByDishAndIngredients);
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id });
    const ingredients = await knex("ingredients").where({ dish_id: id });

    response.json({ dish, ingredients });
  }
}

module.exports = DishesController;
