import { Component, input } from '@angular/core';
import { Livro } from './livro.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livro',
  imports: [CommonModule],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css',
})
export class LivroComponent {
  livro = input.required<Livro>();

  alternarFavorito(): void {
    this.livro().favorito = !this.livro().favorito;
  }
}
