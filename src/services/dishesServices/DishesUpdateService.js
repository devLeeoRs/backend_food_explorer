const AppError = require("../../utils/AppError");

class DishesUpdateService {
  constructor(dishesRepository) {
    this.DishesRepository = dishesRepository;
  }

  async execute(name, description, price, stock_qtd, id) {
    const [dish] = await this.DishesRepository.searchDishesById(id);

    if (!dish) {
      throw new AppError("dish not found");
    }

    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;
    dish.stock_qtd = stock_qtd ?? dish.stock_qtd;

    this.DishesRepository.update(dish, id);
  }
}

module.exports = DishesUpdateService;
