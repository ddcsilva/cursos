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
  template: `
    <mat-card class="livro-card">
      <mat-card-header>
        <mat-card-title>{{ livro.titulo }}</mat-card-title>
        <mat-card-subtitle>{{ livro.editora }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <p class="preco">
          <strong>{{ livro.preco | currency : 'BRL' }}</strong>
        </p>
        <p class="paginas">{{ livro.paginas }} páginas</p>
        <p class="autor">{{ livro.autor?.nome || 'Autor não informado' }}</p>
      </mat-card-content>

      <mat-card-actions>
        <button
          mat-icon-button
          (click)="onEditar.emit(livro)"
          matTooltip="Editar livro"
        >
          <mat-icon>edit</mat-icon>
        </button>
        <button
          mat-icon-button
          color="warn"
          (click)="onExcluir.emit(livro._id!)"
          matTooltip="Excluir livro"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .livro-card {
        position: relative;
        overflow: hidden;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.85) 100%
        );
        border: 1px solid rgba(99, 102, 241, 0.1);

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--primary-color),
            var(--accent-color)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &:hover::before {
          opacity: 1;
        }

        &:hover {
          transform: translateY(-1px);
        }
      }

      mat-card-header {
        padding: 20px 20px 12px 20px;

        mat-card-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 4px;
        }

        mat-card-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
        }
      }

      mat-card-content {
        padding: 0 20px 16px 20px;

        p {
          margin: 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);

          &.preco {
            color: var(--accent-color);
            font-weight: 600;
            font-size: 16px;
          }

          &.paginas::before {
            content: '📄';
            font-size: 14px;
          }

          &.autor::before {
            content: '✍️';
            font-size: 14px;
          }
        }
      }

      mat-card-actions {
        padding: 12px 20px 20px 20px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        background: rgba(249, 250, 251, 0.5);
        border-top: 1px solid rgba(229, 231, 235, 0.3);

        button {
          border-radius: 8px;
          transition: all 0.2s ease;

          &:hover {
            transform: scale(1.05);
          }

          &[color='warn']:hover {
            background-color: rgba(239, 68, 68, 0.1);
          }

          &:not([color='warn']):hover {
            background-color: rgba(99, 102, 241, 0.1);
          }
        }
      }

      @media (max-width: 480px) {
        mat-card-actions {
          justify-content: center;
        }
      }
    `,
  ],
})
export class LivroCardComponent {
  @Input() livro!: Livro;
  @Output() onEditar = new EventEmitter<Livro>();
  @Output() onExcluir = new EventEmitter<string>();
}
