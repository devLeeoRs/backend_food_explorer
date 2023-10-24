const AppError = require("../../utils/AppError");

class DishesIndexService {
  constructor(DishesRepository) {
    this.DishesRepository = DishesRepository;
  }

  async execute(search) {
    const filterByDishAndIngredients =
      await this.DishesRepository.findByDishAndIngredients(search);

    if (filterByDishAndIngredients.length === 0) {
      throw new AppError("❌ no dishes found");
    }

    return filterByDishAndIngredients;
  }
}

module.exports = DishesIndexService;
