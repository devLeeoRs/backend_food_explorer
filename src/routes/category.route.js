const { Router } = require("express");

const CategoryController = require("../controllers/Category.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.use(ensureAuthenticated);

categoryRouter.get("/", categoryController.index);

module.exports = categoryRouter;
