import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Autor } from '../../../../models/autor.model';
import { AutorCardComponent } from '../autor-card/autor-card.component';
import { AutorEmptyStateComponent } from '../autor-empty-state/autor-empty-state.component';

@Component({
  selector: 'app-autor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    AutorCardComponent,
    AutorEmptyStateComponent,
  ],
  template: `
    <div class="autor-list">
      <div class="grid" *ngIf="autores.length > 0">
        <app-autor-card
          *ngFor="let autor of autores; trackBy: trackByAutor"
          [autor]="autor"
          (onEditar)="onEditar.emit($event)"
          (onExcluir)="onExcluir.emit($event)"
        ></app-autor-card>
      </div>

      <app-autor-empty-state
        *ngIf="autores.length === 0"
        (onAdicionarAutor)="onAdicionarAutor.emit()"
      ></app-autor-empty-state>
    </div>
  `,
  styles: [
    `
      .autor-list {
        margin-top: 24px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
export class AutorListComponent {
  @Input() autores: Autor[] = [];
  @Output() onEditar = new EventEmitter<Autor>();
  @Output() onExcluir = new EventEmitter<string>();
  @Output() onAdicionarAutor = new EventEmitter<void>();

  trackByAutor(index: number, autor: Autor): string {
    return autor._id || index.toString();
  }
}
