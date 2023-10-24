class DishesUpdateService {
  constructor(dishesRepository) {
    this.DishesRepository = dishesRepository;
  }

  async execute(name, description, price, stock_qtd, id) {
    const dish = this.DishesRepository.searchDishesById(id);

    this.DishesRepository.update(name, description, price, stock_qtd, dish);
  }
}

module.exports = DishesUpdateService;
