const { Router } = require("express");
const UsersController = require("../controllers/Users.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoute = Router();

const usersController = new UsersController();

userRoute.post("/", usersController.create);
userRoute.put("/", ensureAuthenticated, usersController.update);
userRoute.delete("/:id", ensureAuthenticated, usersController.delete);

module.exports = userRoute;
