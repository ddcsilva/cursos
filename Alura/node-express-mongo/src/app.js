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

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).json("Livro removido com sucesso");
});

export default app;
