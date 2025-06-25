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
  templateUrl: './autor-list.component.html',
  styleUrl: './autor-list.component.scss',
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
