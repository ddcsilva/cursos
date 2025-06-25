import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Livro } from '../../../../models/livro.model';

@Component({
  selector: 'app-livro-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './livro-card.component.html',
  styleUrl: './livro-card.component.scss',
})
export class LivroCardComponent {
  @Input() livro!: Livro;
  @Output() onEditar = new EventEmitter<Livro>();
  @Output() onExcluir = new EventEmitter<string>();
}
