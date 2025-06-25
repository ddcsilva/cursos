import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-autor-empty-state',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './autor-empty-state.component.html',
  styleUrl: './autor-empty-state.component.scss',
})
export class AutorEmptyStateComponent {
  @Output() onAdicionarAutor = new EventEmitter<void>();
}
