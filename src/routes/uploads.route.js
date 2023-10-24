const { Router } = require("express");
const uploadConfig = require("../configs/uploadConfig");
const multer = require("multer");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const roleAuthenticated = require("../middlewares/roleAuthenticated");
const UploadController = require("../controllers/Uploads.controller");

const uploadsRoute = Router();
const upload = multer(uploadConfig.MULTER);
const uploadController = new UploadController();

uploadsRoute.patch(
  "/userAvatar",
  ensureAuthenticated,
  upload.single("upload"),
  uploadController.updateAvatar
);
uploadsRoute.patch(
  "/dishPhoto/:id",
  ensureAuthenticated,
  roleAuthenticated(["admin"]),
  upload.single("upload"),
  uploadController.updateDish
);

module.exports = uploadsRoute;
