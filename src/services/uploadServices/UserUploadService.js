const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/diskStorage");

class UserUploadService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  async execute(user_id, avatarFilename) {
    const diskStorage = new DiskStorage();

    const [user] = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        "Only authenticated users can change their avatar",
        401
      );
    }

    if (user.avatar_url) {
      await diskStorage.deleteFile(user.avatar_url);
    }

    const filename = await diskStorage.saveFile(avatarFilename);

    user.avatar_url = filename;

    await this.userRepository.update(user, user_id);

    console.log(user);

    return user;
  }
}

module.exports = UserUploadService;
