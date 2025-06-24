import express from "express";
import cors from "cors";
import connectaNoBancoDeDados from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await connectaNoBancoDeDados();
const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:4200", // Permite requisições do Angular
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  })
);

routes(app);

conexao.on("error", (erro) => {
  console.error("❌ Erro de conexão:", erro);
});

conexao.once("open", () => {
  console.log("🚀 Conexão com o banco feita com sucesso!");
});

export default app;
