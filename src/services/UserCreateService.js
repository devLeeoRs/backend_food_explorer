const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  async execute(name, email, password) {
    if (!name || !email || !password) {
      throw new AppError("invalid data");
    }

    const checkIsEmailExist = await this.userRepository.findByEmail(email);

    if (checkIsEmailExist.length > 0) {
      throw new AppError("email is exist");
    }

    const passwordHashed = await hash(password, 8);

    await this.userRepository.userCreate(name, email, passwordHashed);
  }
}

module.exports = UserCreateService;
