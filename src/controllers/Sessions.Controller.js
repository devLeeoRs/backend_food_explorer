const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("invalid email/or password");
    }

    const checkIsPassword = await compare(password, user.password);

    if (!checkIsPassword) {
      throw new AppError("invalid email/or password");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    console.log(`Token do sessions : ${token}`);

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: "true",
      maxAge: 65 * 60 * 1000,
    });

    delete user.password;

    response.status(201).json({ user });
  }
}

module.exports = SessionsController;
