const knex = require("../../database/knex");
const AppError = require("../../utils/AppError");

class DishesUpdateService {
  constructor(dishesRepository) {
    this.DishesRepository = dishesRepository;
  }

  async execute(name, description, price, stock_qtd, id, ingredients) {
    const [dish] = await this.DishesRepository.searchDishesById(id);

    if (!dish) {
      throw new AppError("dish not found");
    }

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id }).del();

      const updateIngredient = ingredients.map((name) => {
        return {
          name,
          user_id: 21,
          dish_id: Number(id),
        };
      });



      try {
        await knex("ingredients").insert(updateIngredient);
      } catch (error) {
        console.log(error);
      }
    }

    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;
    dish.stock_qtd = stock_qtd ?? dish.stock_qtd;

    this.DishesRepository.update(dish, id);
  }
}

module.exports = DishesUpdateService;
