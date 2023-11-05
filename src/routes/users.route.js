const { Router } = require("express");
const UsersController = require("../controllers/Users.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const roleAuthenticated = require("../middlewares/roleAuthenticated");
const UsersValidatedController = require("../controllers/UsersValidated.Controller");

const userRoute = Router();

const usersController = new UsersController();
const userValidatedController = new UsersValidatedController();

userRoute.post("/", usersController.create);
userRoute.get("/validated", ensureAuthenticated, userValidatedController.index);
userRoute.put("/", ensureAuthenticated, usersController.update);
userRoute.delete(
  "/:id",
  ensureAuthenticated,
  roleAuthenticated(["admin"]),
  usersController.delete
);

module.exports = userRoute;
