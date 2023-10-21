const { Router } = require("express");
const SessionsController = require("../controllers/Sessions.Controller");

const sessionRoute = Router();
const sessionsController = new SessionsController();

sessionRoute.post("/", sessionsController.create);

module.exports = sessionRoute;
