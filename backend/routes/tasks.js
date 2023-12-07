const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getTasksByTrackId, getTaskById, updateTask } = require("../controllers/tasks");

router.use(verifyToken);
router.get("/:trackId", getTasksByTrackId);
router.get("/task/:id", getTaskById);
router.put("/", updateTask);


module.exports = router;
