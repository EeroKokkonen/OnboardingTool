const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getTracksByUserId } = require("../controllers/tracks");

router.use(verifyToken);
router.get("/:uid", getTracksByUserId);

module.exports = router;
