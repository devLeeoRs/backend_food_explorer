const { Router } = require("express");
const IngredientsController = require("../controllers/Ingredients.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const roleAuthenticated = require("../middlewares/roleAuthenticated");

const ingredientsRoute = Router();
const ingredientsController = new IngredientsController();

ingredientsRoute.use(ensureAuthenticated);
ingredientsRoute.put(
  "/",
  roleAuthenticated(["admin"]),
  ingredientsController.update
);
ingredientsRoute.get(
  "/:dish_id",
  ensureAuthenticated,
  ingredientsController.index
);
ingredientsRoute.delete(
  "/:id",
  roleAuthenticated(["admin"]),
  ingredientsController.delete
);

module.exports = ingredientsRoute;
