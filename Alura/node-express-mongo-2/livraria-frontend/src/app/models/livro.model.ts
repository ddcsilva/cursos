import { Autor } from './autor.model';

export interface Livro {
  _id?: string;
  titulo: string;
  editora: string;
  preco: number;
  paginas: number;
  autor: Autor | null;
}
