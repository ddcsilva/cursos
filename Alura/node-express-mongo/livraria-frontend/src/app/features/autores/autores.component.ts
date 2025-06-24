import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AutoresService } from './autores.service';
import { Autor } from '../../models/autor.model';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.scss',
})
export class AutoresComponent implements OnInit {
  autores: Autor[] = [];
  autor: Omit<Autor, '_id'> = { nome: '', nacionalidade: '' };
  editing: Autor | null = null;
  showForm = false;
  loading = false;

  constructor(private autoresService: AutoresService) {}

  ngOnInit() {
    this.loadAutores();
  }

  loadAutores() {
    this.loading = true;
    this.autoresService.getAll().subscribe({
      next: (data) => {
        this.autores = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  save() {
    const request = this.editing
      ? this.autoresService.update(this.editing._id!, this.autor)
      : this.autoresService.create(this.autor);

    request.subscribe(() => {
      this.loadAutores();
      this.reset();
    });
  }

  edit(autor: Autor) {
    this.editing = autor;
    this.autor = { nome: autor.nome, nacionalidade: autor.nacionalidade };
    this.showForm = true;
  }

  delete(id: string) {
    if (confirm('Deletar autor?')) {
      this.autoresService.delete(id).subscribe(() => this.loadAutores());
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.reset();
  }

  reset() {
    this.autor = { nome: '', nacionalidade: '' };
    this.editing = null;
    this.showForm = false;
  }
}
