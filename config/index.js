require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.MONGO_URL,
  JWT_SECRET: "your-jwt-secret",
};
