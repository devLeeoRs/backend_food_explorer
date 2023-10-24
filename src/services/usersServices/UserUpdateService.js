const AppError = require("../../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserCreateService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  async execute(name, email, password, old_password, user_id) {
    const [user] = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("usuario nao encontrado");
    }

    const [userWithUpdateEmail] = await this.userRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("email ja esta em uso !");
    }

    user.email = email ?? user.email;
    user.name = name ?? user.name;

    if (password && old_password) {
      const checkIsPassword = await compare(old_password, user.password);

      if (!checkIsPassword) {
        throw new AppError("Senha antiga é invalida ");
      }

      user.password = await hash(password, 8);
    }

    await this.userRepository.update(user, user_id);
  }
}

module.exports = UserCreateService;
