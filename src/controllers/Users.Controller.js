const UserCreateService = require("../services/UserCreateService");
const UserRepository = require("../repositories/UserRepository");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute(name, email, password);

    response.json({ message: "User created success" });
  }
}

module.exports = UsersController;
