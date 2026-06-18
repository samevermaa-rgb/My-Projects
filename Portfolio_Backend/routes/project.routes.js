const express = require("express");

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
  getProjectCount
);

router.get(
  "/",
  getProjects
);

router.post(
  "/",
  createProject
);

module.exports = router;