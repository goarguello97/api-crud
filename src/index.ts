import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import db from "./config/dbConfig";
import { IPORT } from "./interfaces/envConfig.interface";
import router from "./routes/index.routes";

dotenv.config({ path: ".env" });

const { PORT }: IPORT = (process.env || 3001) as unknown as IPORT;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api", router);

db.sync({ force: false }).then(() => {
  console.log(`Base de datos conectada`);
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
});
