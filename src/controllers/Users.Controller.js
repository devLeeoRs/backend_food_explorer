const UserCreateService = require("../services/UserCreateService");
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
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    console.log(name, email, password, old_password);

    const user = await knex("users").where({ id: user_id });

    if (!user) {
      throw new AppError("usuario nao encontrado");
    }

    const userWithUpdateEmail = await knex("users").where({ email });

    if (userWithUpdateEmail || userWithUpdateEmail.id !== user.id) {
      throw new AppError("email ja esta em uso !");
    }

    user.email = email ?? user.email;
    user.name = name ?? user.name;

    if (password && old_password) {
      const checkIsPassword = await compare(password, old_password);

      if (checkIsPassword) {
        throw new AppError("Senha antiga é invalida ");
      }

      user.password = await hash(password, 8);
    }

    console.log("chego aqui");
    await knex("users").where({ id: user.id }).update({ user });

    response.json({ message: "user atualizado com sucesso " });
  }
}

module.exports = UsersController;
