require("dotenv").config();

const app = require("./app");
const sequelize = require("./models");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    const port = Number(process.env.PORT) || 3000;
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

startServer();
