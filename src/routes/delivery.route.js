const { Router } = require("express");
const DeliveryController = require("../controllers/Delivery.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const roleAuthenticated = require("../middlewares/roleAuthenticated");

const deliveryRoute = Router();
const deliveryController = new DeliveryController();

deliveryRoute.use(ensureAuthenticated);
deliveryRoute.put("/", roleAuthenticated(["admin"]), deliveryController.update);

module.exports = deliveryRoute;
