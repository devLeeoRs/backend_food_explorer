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
dishesRoute.get("/", ensureAuthenticated, dishesController.index);
dishesRoute.get("/:id", ensureAuthenticated, dishesController.show);

module.exports = dishesRoute;
