require("dotenv").config();

const envOrFallback = (...keys) => {
  for (const key of keys) {
    if (process.env[key]) {
      return process.env[key];
    }
  }

  return undefined;
};

const defaultConfig = {
  username: envOrFallback("DB_USER", "PGUSER", "POSTGRES_USER") || "postgres",
  password: envOrFallback("DB_PASS", "PGPASSWORD", "POSTGRES_PASSWORD") || "123456",
  database: envOrFallback("DB_NAME", "PGDATABASE", "POSTGRES_DB") || "movieapi_db_dev",
  host: envOrFallback("DB_HOST", "PGHOST", "POSTGRES_HOST") || "127.0.0.1",
  port: Number(envOrFallback("DB_PORT", "PGPORT", "POSTGRES_PORT") || 5432),
  dialect: "postgres",
  logging: false,
};

const productionConfig = process.env.DATABASE_URL
  ? {
      use_env_variable: "DATABASE_URL",
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: process.env.DB_SSL === "false" ? false : { require: true, rejectUnauthorized: false },
      },
    }
  : {
      ...defaultConfig,
    };

module.exports = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    database: process.env.DB_NAME_TEST || "movieapi_db_test",
  },
  production: productionConfig,
};
