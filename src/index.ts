import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import db from "./config/dbConfig";
import { PORT } from "./interfaces/envConfig.interface";

dotenv.config({ path: ".env" });

const { PORT }: PORT = (process.env || 3001) as unknown as PORT;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

db.sync({ force: false }).then(() => {
  console.log(`Base de datos conectada`);
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
});
