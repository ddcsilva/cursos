import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Autor } from '../../../../models/autor.model';

@Component({
  selector: 'app-autor-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './autor-card.component.html',
  styleUrl: './autor-card.component.scss',
})
export class AutorCardComponent {
  @Input() autor!: Autor;
  @Output() onEditar = new EventEmitter<Autor>();
  @Output() onExcluir = new EventEmitter<string>();
}
