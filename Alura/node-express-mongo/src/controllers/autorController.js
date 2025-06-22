import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao listar os autores - ${erro.message}` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      res.status(200).json(autorEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao buscar o autor - ${erro.message}` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Autor criado com sucesso", autor: novoAutor });
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao cadastrar o autor - ${erro.message}` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao atualizar o autor - ${erro.message}` });
    }
  }

  static async deletarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor deletado com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `Ocorreu uma falha ao deletar o autor - ${erro.message}` });
    }
  }
}

export default AutorController;
