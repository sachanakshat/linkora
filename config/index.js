require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
