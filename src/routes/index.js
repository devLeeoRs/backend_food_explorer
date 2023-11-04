const { Router } = require("express");
const userRoute = require("../routes/users.route");
const sessionRoute = require("../routes/sessions.route");
const ingredientsRoute = require("../routes/ingredients.route");
const uploadRoute = require("../routes/uploads.route");
const dishesRoute = require("../routes/dishes.route");
const categoryRoute = require("../routes/category.route");
const ordersRoute = require("../routes/orders.route");
const deliveryRoute = require("../routes/delivery.route");
const router = Router();

router.use("/users", userRoute);
router.use("/upload", uploadRoute);
router.use("/sessions", sessionRoute);
router.use("/dishes", dishesRoute);
router.use("/ingredients", ingredientsRoute);
router.use("/category", categoryRoute);
router.use("/orders", ordersRoute);
router.use("/delivery", deliveryRoute);

module.exports = router;
