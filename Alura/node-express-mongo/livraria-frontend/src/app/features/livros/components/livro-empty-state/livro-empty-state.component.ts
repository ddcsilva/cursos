import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-livro-empty-state',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
    <div class="empty-state">
      <mat-icon>library_books</mat-icon>
      <h3>Nenhum livro encontrado</h3>
      <p>Que tal adicionar o primeiro livro à sua biblioteca?</p>
      <button
        mat-raised-button
        color="primary"
        (click)="onAdicionarLivro.emit()"
      >
        <mat-icon>add</mat-icon>
        Adicionar Livro
      </button>
    </div>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 64px 24px;
        text-align: center;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.85) 100%
        );
        border-radius: var(--border-radius);
        border: 2px dashed rgba(99, 102, 241, 0.2);
        margin-top: 24px;

        mat-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        h3 {
          margin: 0 0 8px 0;
          color: var(--text-primary);
          font-size: 20px;
          font-weight: 600;
        }

        p {
          margin: 0 0 24px 0;
          color: var(--text-secondary);
          font-size: 16px;
        }

        button {
          gap: 8px;
          display: flex;
          align-items: center;
        }
      }
    `,
  ],
})
export class LivroEmptyStateComponent {
  @Output() onAdicionarLivro = new EventEmitter<void>();
}
