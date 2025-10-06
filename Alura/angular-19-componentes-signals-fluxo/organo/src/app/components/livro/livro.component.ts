import { Component } from '@angular/core';

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

  livro = {
    titulo: 'As Ondas',
    autoria: 'Virginia Woolf',
    favorito: false,
    imagem:
      'https://m.media-amazon.com/images/I/81mQc+sz2OS._UF894,1000_QL80_.jpg',
  };
}
