const { Router } = require("express");

const DishesController = require("../controllers/Dishes.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const roleAuthenticated = require("../middlewares/roleAuthenticated");

const dishesRoute = Router();

const dishesController = new DishesController();

dishesRoute.use(ensureAuthenticated);

dishesRoute.post("/", roleAuthenticated(["admin"]), dishesController.create);
dishesRoute.put("/:id", roleAuthenticated(["admin"]), dishesController.update);
dishesRoute.delete(
  "/:id",
  roleAuthenticated(["admin"]),
  dishesController.delete
);
dishesRoute.get("/dish/:id", ensureAuthenticated, dishesController.show);
dishesRoute.get(
  "/:category?/:search?",
  ensureAuthenticated,
  dishesController.index
);

module.exports = dishesRoute;
