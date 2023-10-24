class IngredientUpdateServices {
  constructor(IngredientsRepository) {
    this.IngredientsRepository = IngredientsRepository;
  }

  async execute(updateIngredients) {
    for (const ingredient of updateIngredients) {
      const { id, name } = ingredient;

      await this.IngredientsRepository.update(id, name);
    }
  }
}

module.exports = IngredientUpdateServices;
