const express = require("express");
const auth = require("../middleware/auth.middleware")
const admin = require("../middleware/admin.middleware")
const upload = require("../middleware/upload.middleware")

const {
  getProjectCount,
  createProject,
  getProjects,
} = require(
  "../controllers/project.controller"
);

const router =
  express.Router();

router.post(
  "/",
  auth,
  admin,
  upload.array("screenshots", 5),
  createProject
);

router.get(
  "/",
  auth,
  admin,
  getProjects
);

router.post(
  "/",
  auth,
  admin,
  createProject
);

module.exports = router;