import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { EnvConfig } from "../interfaces/envConfig.interface";

dotenv.config({ path: ".env" });

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME }: EnvConfig =
  process.env as unknown as EnvConfig;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: false,
  },
  ssl: true,
  logging: false,
});

export default db;
