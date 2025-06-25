import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Livro } from '../../../../models/livro.model';
import { LivroCardComponent } from '../livro-card/livro-card.component';
import { LivroEmptyStateComponent } from '../livro-empty-state/livro-empty-state.component';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LivroCardComponent,
    LivroEmptyStateComponent,
  ],
  templateUrl: './livro-list.component.html',
  styleUrl: './livro-list.component.scss',
})
export class LivroListComponent {
  @Input() livros: Livro[] = [];
  @Output() onEditar = new EventEmitter<Livro>();
  @Output() onExcluir = new EventEmitter<string>();
  @Output() onAdicionarLivro = new EventEmitter<void>();

  trackByLivro(index: number, livro: Livro): string {
    return livro._id || index.toString();
  }
}
