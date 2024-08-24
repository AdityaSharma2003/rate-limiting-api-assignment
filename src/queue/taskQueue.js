const Queue = require("bull");
const { redisClient } = require("../config/redisConfig");
require("dotenv").config();

const taskQueue = new Queue("taskQueue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

taskQueue.process(async (job) => {
  // Simulate task processing
  console.log(`Processing task for user ${job.data.user_id}`);
});

exports.addTaskToQueue = async (user_id) => {
  await taskQueue.add({ user_id });
};
