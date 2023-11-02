const AppError = require("../../utils/AppError");

class DishesIndexService {
  constructor(DishesRepository) {
    this.DishesRepository = DishesRepository;
  }

  async execute(search, category) {
    const filterByDishAndIngredients =
      await this.DishesRepository.findByDishAndIngredients(search, category);

    return filterByDishAndIngredients;
  }
}

module.exports = DishesIndexService;
