import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-livro-empty-state',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './livro-empty-state.component.html',
  styleUrl: './livro-empty-state.component.scss',
})
export class LivroEmptyStateComponent {
  @Output() onAdicionarLivro = new EventEmitter<void>();
}
