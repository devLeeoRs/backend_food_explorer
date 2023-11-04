const { Router } = require("express");
const OrdersController = require("../controllers/Orders.controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const roleAuthenticated = require("../middlewares/roleAuthenticated");

const ordersRoute = Router();
const ordersController = new OrdersController();

ordersRoute.use(ensureAuthenticated);
ordersRoute.post("/", ordersController.create);
ordersRoute.put("/", roleAuthenticated(["admin"]), ordersController.update);
ordersRoute.get("/all", ordersController.index);
ordersRoute.get("/", ordersController.show);

module.exports = ordersRoute;
