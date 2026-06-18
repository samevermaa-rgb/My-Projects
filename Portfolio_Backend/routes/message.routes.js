const express =
require("express");

const router =
express.Router();

const {
  getMessageCount,
} = require(
  "../controllers/message.controller"
);

router.get(
  "/count",
  getMessageCount
);

module.exports=
router;