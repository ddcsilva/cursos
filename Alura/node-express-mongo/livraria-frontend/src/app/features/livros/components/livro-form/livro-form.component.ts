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
import { MatSelectModule } from '@angular/material/select';

import { Livro } from '../../../../models/livro.model';
import { Autor } from '../../../../models/autor.model';

interface LivroFormData {
  titulo: string;
  editora: string;
  preco: number;
  paginas: number;
  autor: string;
}

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  template: `
    <mat-card class="livro-form-card">
      <mat-card-content>
        <form (ngSubmit)="handleSubmit()" #form="ngForm">
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Título</mat-label>
              <input
                matInput
                [(ngModel)]="formData.titulo"
                name="titulo"
                required
                #titulo="ngModel"
              />
              <mat-icon matPrefix>title</mat-icon>
              <mat-error *ngIf="titulo.invalid && titulo.touched">
                Título é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Editora</mat-label>
              <input
                matInput
                [(ngModel)]="formData.editora"
                name="editora"
                required
                #editora="ngModel"
              />
              <mat-icon matPrefix>business</mat-icon>
              <mat-error *ngIf="editora.invalid && editora.touched">
                Editora é obrigatória
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Preço</mat-label>
              <input
                matInput
                type="number"
                step="0.01"
                min="0"
                [(ngModel)]="formData.preco"
                name="preco"
                required
                #preco="ngModel"
              />
              <mat-icon matPrefix>attach_money</mat-icon>
              <mat-error *ngIf="preco.invalid && preco.touched">
                Preço é obrigatório e deve ser maior que zero
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Páginas</mat-label>
              <input
                matInput
                type="number"
                min="1"
                [(ngModel)]="formData.paginas"
                name="paginas"
                required
                #paginas="ngModel"
              />
              <mat-icon matPrefix>description</mat-icon>
              <mat-error *ngIf="paginas.invalid && paginas.touched">
                Número de páginas é obrigatório
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Autor</mat-label>
            <mat-select
              [(ngModel)]="formData.autor"
              name="autor"
              required
              #autor="ngModel"
            >
              <mat-option *ngFor="let autor of autores" [value]="autor._id">
                {{ autor.nome }}
              </mat-option>
            </mat-select>
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="autor.invalid && autor.touched">
              Selecione um autor
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
      .livro-form-card {
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

      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 8px;

        mat-form-field {
          flex: 1;
        }

        @media (max-width: 768px) {
          flex-direction: column;
          gap: 0;
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
export class LivroFormComponent implements OnInit, OnChanges {
  @Input() livro: Livro | null = null;
  @Input() autores: Autor[] = [];
  @Input() salvando = false;
  @Output() onSalvar = new EventEmitter<LivroFormData>();
  @Output() onCancelar = new EventEmitter<void>();

  formData: LivroFormData = {
    titulo: '',
    editora: '',
    preco: 0,
    paginas: 0,
    autor: '',
  };

  get isEditing(): boolean {
    return this.livro !== null;
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges() {
    this.resetForm();
  }

  private resetForm() {
    if (this.livro) {
      this.formData = {
        titulo: this.livro.titulo,
        editora: this.livro.editora,
        preco: this.livro.preco,
        paginas: this.livro.paginas,
        autor: this.livro.autor?._id || '',
      };
    } else {
      this.formData = {
        titulo: '',
        editora: '',
        preco: 0,
        paginas: 0,
        autor: '',
      };
    }
  }

  handleSubmit() {
    if (
      this.formData.titulo &&
      this.formData.editora &&
      this.formData.preco > 0 &&
      this.formData.paginas > 0 &&
      this.formData.autor
    ) {
      this.onSalvar.emit(this.formData);
    }
  }

  handleClear() {
    this.formData = {
      titulo: '',
      editora: '',
      preco: 0,
      paginas: 0,
      autor: '',
    };
  }
}
