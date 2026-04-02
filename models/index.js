const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env] || config.development;

const connectionOptions = {
  dialect: "postgres",
  logging: false,
};

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    ...connectionOptions,
    dialectOptions: {
      ssl: process.env.DB_SSL === "false" ? false : { require: true, rejectUnauthorized: false },
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || dbConfig.database,
    process.env.DB_USER || dbConfig.username,
    process.env.DB_PASS || dbConfig.password,
    {
      ...connectionOptions,
      host: process.env.DB_HOST || dbConfig.host,
      port: Number(process.env.DB_PORT || dbConfig.port || 5432),
    },
  );
}

module.exports = sequelize;
