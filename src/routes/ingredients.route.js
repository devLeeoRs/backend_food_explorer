const { Router } = require("express");
const IngredientsController = require("../controllers/Ingredients.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ingredientsRoute = Router();
const ingredientsController = new IngredientsController();

ingredientsRoute.put("/", ensureAuthenticated, ingredientsController.update);
ingredientsRoute.get(
  "/:dish_id",
  ensureAuthenticated,
  ingredientsController.index
);
ingredientsRoute.delete(
  "/:id",
  ensureAuthenticated,
  ingredientsController.delete
);

module.exports = ingredientsRoute;
