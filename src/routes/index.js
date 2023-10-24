const { Router } = require("express");
const userRoute = require("../routes/users.route");
const sessionRoute = require("../routes/sessions.route");
const ingredientsRoute = require("../routes/ingredients.route");
const uploadRoute = require("../routes/uploads.route");
const dishesRoute = require("../routes/dishes.route");
const router = Router();

router.use("/users", userRoute);
router.use("/upload", uploadRoute);
router.use("/sessions", sessionRoute);
router.use("/dishes", dishesRoute);
router.use("/ingredients", ingredientsRoute);

module.exports = router;
