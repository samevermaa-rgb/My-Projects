const express = require("express");
const auth = require("../middleware/auth.middleware")
const admin = require("../middleware/admin.middleware")

const {
  getProjectCount,
  createProject,
  getProjects,
} = require(
  "../controllers/project.controller"
);

const router =
  express.Router();

router.get(
  "/count",
  auth,
  admin,
  getProjectCount
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