import { Component } from '@angular/core';
import { Livro } from './livro.interface';

@Component({
  selector: 'app-livro',
  imports: [],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css',
})
export class LivroComponent {
  alternarFavorito(): void {
    this.livro.favorito = !this.livro.favorito;
  }

  livro: Livro = {
    titulo: 'As Ondas',
    autoria: 'Virginia Woolf',
    favorito: false,
    genero: 'Ficção',
    imagem:
      'https://m.media-amazon.com/images/I/81mQc+sz2OS._UF894,1000_QL80_.jpg',
  };
}
