import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao listar os livros - ${erro.message}` });
    }
  }

  static async listarLivrosPorId(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao buscar o livro - ${erro.message}` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao cadastrar um livro - ${erro.message}` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao atualizar o livro - ${erro.message}` });
    }
  }

  static async deletarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao deletar o livro - ${erro.message}` });
    }
  }
}

export default LivroController;
