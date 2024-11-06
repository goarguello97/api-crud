import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { IEnvConfig } from "../interfaces/envConfig.interface";

dotenv.config({ path: ".env" });

// Conexión a BBDD y creación de instancia de sequelize.

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME }: IEnvConfig =
  process.env as unknown as IEnvConfig;

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
