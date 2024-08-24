const express = require("express");
const { addTask } = require("../controllers/taskController");
const { limitRequests } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/task", limitRequests, addTask);

module.exports = router;
