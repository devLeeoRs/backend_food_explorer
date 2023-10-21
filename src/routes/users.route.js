const { Router } = require("express");
const UsersController = require("../controllers/Users.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoute = Router();

const usersController = new UsersController();

userRoute.post("/", usersController.create);
userRoute.put("/", ensureAuthenticated, usersController.update);

module.exports = userRoute;
