const { Router } = require("express");
const UsersController = require("../controllers/Users.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoute = Router();

const usersController = new UsersController();

userRoute.post("/", usersController.create);
userRoute.get("/", ensureAuthenticated, (request, response) => {
  response.send("ok ");
});

module.exports = userRoute;
