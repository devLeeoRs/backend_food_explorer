const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/diskStorage");

const UserUploadService = require("../services/uploadServices/UserUploadService");
const UserRepository = require("../repositories/UserRepository");

class UploadController {
  async updateAvatar(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const userRepository = new UserRepository();
    const userUploadService = new UserUploadService(userRepository);
    const user = await userUploadService.execute(user_id, avatarFilename);

    response.json(user);
  }

  async updateDish(request, response) {
    const { id } = request.params;
    const dishFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

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

    response.json(dish);
  }
}

module.exports = UploadController;
