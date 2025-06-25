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
  templateUrl: './livro-form.component.html',
  styleUrl: './livro-form.component.scss',
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
