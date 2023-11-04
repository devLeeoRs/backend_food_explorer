const UserCreateService = require("../services/usersServices/UserCreateService");
const UserUpdateService = require("../services/usersServices/UserUpdateService");
const UserRepository = require("../repositories/UserRepository");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare, hash } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute(name, email, password);

    response.json({ message: "User created success" });
  }

  async update(request, response) {
    const {
      name,
      email,
      password,
      old_password,
      phone,
      cpf,
      birth_date,
      address,
      address_number,
      address_area,
      city,
      zip_code,
    } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userUpdateService = new UserUpdateService(userRepository);
    await userUpdateService.execute(
      name,
      email,
      password,
      old_password,
      user_id,
      phone,
      cpf,
      birth_date,
      address,
      address_number,
      address_area,
      city,
      zip_code
    );

    response.json({ message: "user updated successfully" });
  }

  async delete(request, response) {
    const { id } = request.params;
    const userRepository = new UserRepository();
    await userRepository.delete(id);

    response.json({ message: "user delete successfully" });
  }
}

module.exports = UsersController;
