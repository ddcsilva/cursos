import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { Autor } from '../../../../models/autor.model';

interface AutorFormData {
  nome: string;
  nacionalidade: string;
}

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="autor-form-card">
      <mat-card-content>
        <form (ngSubmit)="handleSubmit()" #form="ngForm">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input
              matInput
              [(ngModel)]="formData.nome"
              name="nome"
              required
              #nome="ngModel"
            />
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="nome.invalid && nome.touched">
              Nome é obrigatório
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Nacionalidade</mat-label>
            <input
              matInput
              [(ngModel)]="formData.nacionalidade"
              name="nacionalidade"
              required
              #nacionalidade="ngModel"
            />
            <mat-icon matPrefix>public</mat-icon>
            <mat-error *ngIf="nacionalidade.invalid && nacionalidade.touched">
              Nacionalidade é obrigatória
            </mat-error>
          </mat-form-field>

          <div class="form-actions">
            <button
              mat-button
              type="button"
              (click)="handleClear()"
              [disabled]="salvando"
            >
              <mat-icon>clear</mat-icon>
              Limpar
            </button>
            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="!form.valid || salvando"
            >
              <mat-icon>{{ isEditing ? 'update' : 'save' }}</mat-icon>
              {{
                salvando ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar'
              }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .autor-form-card {
        margin-bottom: 24px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.98) 0%,
          rgba(249, 250, 251, 0.95) 100%
        );
        border: 2px solid rgba(99, 102, 241, 0.1);

        mat-card-content {
          padding: 24px;
        }
      }

      mat-form-field {
        width: 100%;
        margin-bottom: 16px;

        .mat-mdc-form-field-focus-overlay {
          background-color: rgba(99, 102, 241, 0.05);
        }
      }

      .form-actions {
        display: flex;
        gap: 12px;
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid rgba(229, 231, 235, 0.3);
        justify-content: flex-end;

        @media (max-width: 768px) {
          justify-content: center;
        }
      }
    `,
  ],
})
export class AutorFormComponent implements OnInit, OnChanges {
  @Input() autor: Autor | null = null;
  @Input() salvando = false;
  @Output() onSalvar = new EventEmitter<AutorFormData>();
  @Output() onCancelar = new EventEmitter<void>();

  formData: AutorFormData = {
    nome: '',
    nacionalidade: '',
  };

  get isEditing(): boolean {
    return this.autor !== null;
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges() {
    this.resetForm();
  }

  private resetForm() {
    if (this.autor) {
      this.formData = {
        nome: this.autor.nome,
        nacionalidade: this.autor.nacionalidade,
      };
    } else {
      this.formData = {
        nome: '',
        nacionalidade: '',
      };
    }
  }

  handleSubmit() {
    if (this.formData.nome && this.formData.nacionalidade) {
      this.onSalvar.emit(this.formData);
    }
  }

  handleClear() {
    this.formData = {
      nome: '',
      nacionalidade: '',
    };
  }
}
