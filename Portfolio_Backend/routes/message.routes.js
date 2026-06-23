const express =
require("express");

const auth = require("../middleware/auth.middleware")
const admin = require("../middleware/admin.middleware")

const router =
express.Router();

const {
  getMessageCount,
} = require(
  "../controllers/message.controller"
);

router.get(
  "/count",
  auth,
  admin,
  getMessageCount
);

module.exports=
router;