const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getTasksByTrackId } = require("../controllers/tasks");

router.use(verifyToken);
router.get("/:trackId", getTasksByTrackId);

module.exports = router;
