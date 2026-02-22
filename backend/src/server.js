import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFound.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API Banco de Trocas funcionando" });
});

// Rotas da aplicação
app.use(routes);

// ⚠️ ORDEM IMPORTA: esses dois vêm DEPOIS das rotas
app.use(notFoundHandler);   // Rota inexistente → 404
app.use(errorHandler);      // Erro não tratado → 500

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});