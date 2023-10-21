const { Router } = require("express");
const userRoute = require("../routes/users.route");
const sessionRoute = require("../routes/sessions.route");
const router = Router();

router.use("/users", userRoute);
router.use("/sessions", sessionRoute);

module.exports = router;
