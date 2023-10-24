const { Router } = require("express");
const DishesController = require("../controllers/Dishes.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesRoute = Router();
const dishesController = new DishesController();

dishesRoute.post("/", ensureAuthenticated, dishesController.create);
dishesRoute.put("/:id", ensureAuthenticated, dishesController.update);
dishesRoute.delete("/:id", ensureAuthenticated, dishesController.delete);
dishesRoute.get("/", ensureAuthenticated, dishesController.index);
dishesRoute.get("/:id", ensureAuthenticated, dishesController.show);

module.exports = dishesRoute;
