const { rateLimiter } = require("../utils/rateLimiter");

exports.limitRequests = async (req, res, next) => {
  const { user_id } = req.body;

  try {
    await rateLimiter(user_id);
    next();
  } catch (error) {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
};
