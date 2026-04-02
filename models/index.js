const { Sequelize } = require("sequelize");
const config = require("../config/config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env] || config.development;

const envOrFallback = (...keys) => {
  for (const key of keys) {
    if (process.env[key]) {
      return process.env[key];
    }
  }

  return undefined;
};

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
    envOrFallback("DB_NAME", "PGDATABASE", "POSTGRES_DB") || dbConfig.database,
    envOrFallback("DB_USER", "PGUSER", "POSTGRES_USER") || dbConfig.username,
    envOrFallback("DB_PASS", "PGPASSWORD", "POSTGRES_PASSWORD") || dbConfig.password,
    {
      ...connectionOptions,
      host: envOrFallback("DB_HOST", "PGHOST", "POSTGRES_HOST") || dbConfig.host,
      port: Number(envOrFallback("DB_PORT", "PGPORT", "POSTGRES_PORT") || dbConfig.port || 5432),
    },
  );
}

module.exports = sequelize;
