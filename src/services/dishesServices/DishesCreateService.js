class DishesCreateService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute(
    name,
    description,
    price,
    stock_qtd,
    ingredients,
    category,
    user_id
  ) {
    const [dish_id] = await this.dishesRepository.insertDish(
      user_id,
      name,
      price,
      description,
      stock_qtd
    );

    if (ingredients) {
      const dishIngredients = ingredients.map((ingredient) => {
        return {
          name: ingredient,
          dish_id,
          user_id,
        };
      });

      await this.dishesRepository.insertIngredients(dishIngredients);
    }

    if (category) {
      await this.dishesRepository.insertCategory(user_id, dish_id, category);
    }
  }
}

module.exports = DishesCreateService;
