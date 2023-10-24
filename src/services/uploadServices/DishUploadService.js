class DishUploadService {
  constructor(DishRepository) {
    this.dishRepository = DishRepository;
  }

  async update(id) {
    const diskStorage = new DiskStorage();

    const [dish] = await this.dishRepository.searchDishesById(id);

    if (!dish) {
      throw new AppError(
        "Only authenticated users can change their avatar",
        401
      );
    }

    if (dish.photo_url) {
      await diskStorage.deleteFile(dish.photo_url);
    }

    const filename = await diskStorage.saveFile(dishFileName);

    dish.photo_url = filename;

    await knex("dishes").update(dish).where({ id });
  }
}
