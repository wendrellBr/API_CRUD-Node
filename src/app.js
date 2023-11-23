import express from "express";
import fs from "fs";
import https from "https";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import router from "./routes.js";
app.use(router);

// Inicia o servidor HTTP na porta = 3000
app.listen(3000, () => console.log("Servidor 3000"));

// Criação do servidor HTTPS em outra porta = 3001
https
  .createServer(
    {
      cert: fs.readFileSync("src/SSL/code.crt"),
      key: fs.readFileSync("src/SSL/code.key"),
    },
    app
  )
  .listen(3001, () => console.log("Servidor HTTPS rodando na porta 3001"));
