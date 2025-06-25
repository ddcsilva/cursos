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
  templateUrl: './autor-form.component.html',
  styleUrl: './autor-form.component.scss',
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
