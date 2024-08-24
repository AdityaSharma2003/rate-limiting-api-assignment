const { addTaskToQueue } = require("../queue/taskQueue");
const logger = require("../utils/logger"); // Import the logger

exports.addTask = async (req, res) => {
  const { user_id } = req.body;

  try {
    await addTaskToQueue(user_id);
    logger.info(`Task added for user ${user_id}`); // Log the success message
    return res.status(202).json({ message: "Task added successfully" });
  } catch (error) {
    logger.error(`Failed to add task for user ${user_id}: ${error.message}`); // Log the error
    return res
      .status(429)
      .json({ error: "Rate limit exceeded", details: error.message });
  }
};
