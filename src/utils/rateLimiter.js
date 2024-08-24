const { redisClient } = require("../config/redisConfig");

exports.rateLimiter = async (user_id) => {
  const minuteLimitKey = `rateLimit:${user_id}:minute`;
  const secondLimitKey = `rateLimit:${user_id}:second`;

  const [minuteCount, secondCount] = await Promise.all([
    redisClient.incr(minuteLimitKey),
    redisClient.incr(secondLimitKey),
  ]);

  if (minuteCount === 1) await redisClient.expire(minuteLimitKey, 60);
  if (secondCount === 1) await redisClient.expire(secondLimitKey, 1);

  if (minuteCount > 20 || secondCount > 1) {
    throw new Error("Rate limit exceeded");
  }
};
