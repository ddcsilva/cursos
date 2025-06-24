import express from "express";
import connectaNoBancoDeDados from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await connectaNoBancoDeDados();
const app = express();
routes(app);

conexao.on("error", (erro) => {
  console.error("❌ Erro de conexão:", erro);
});

conexao.once("open", () => {
  console.log("🚀 Conexão com o banco feita com sucesso!");
});

export default app;
