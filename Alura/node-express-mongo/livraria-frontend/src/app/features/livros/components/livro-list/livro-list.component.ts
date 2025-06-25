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
  template: `
    <div class="livro-list">
      <div class="grid" *ngIf="livros.length > 0">
        <app-livro-card
          *ngFor="let livro of livros; trackBy: trackByLivro"
          [livro]="livro"
          (onEditar)="onEditar.emit($event)"
          (onExcluir)="onExcluir.emit($event)"
        ></app-livro-card>
      </div>

      <app-livro-empty-state
        *ngIf="livros.length === 0"
        (onAdicionarLivro)="onAdicionarLivro.emit()"
      ></app-livro-empty-state>
    </div>
  `,
  styles: [
    `
      .livro-list {
        margin-top: 24px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: 24px;
      }

      @media (max-width: 768px) {
        .grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
      }
    `,
  ],
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
