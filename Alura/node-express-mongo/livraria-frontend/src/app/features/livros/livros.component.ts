import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { LivrosService } from './livros.service';
import { AutoresService } from '../autores/autores.service';
import { Livro } from '../../models/livro.model';
import { Autor } from '../../models/autor.model';

@Component({
  selector: 'app-livros',
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
    MatSelectModule,
  ],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.scss',
})
export class LivrosComponent implements OnInit {
  livros: Livro[] = [];
  autores: Autor[] = [];
  livro: any = { titulo: '', editora: '', preco: 0, paginas: 0, autor: '' };
  editing: Livro | null = null;
  showForm = false;
  loading = false;

  constructor(
    private livrosService: LivrosService,
    private autoresService: AutoresService
  ) {}

  ngOnInit() {
    this.loadLivros();
    this.loadAutores();
  }

  loadLivros() {
    this.loading = true;
    this.livrosService.getAll().subscribe({
      next: (data) => {
        this.livros = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  loadAutores() {
    this.autoresService.getAll().subscribe((data) => (this.autores = data));
  }

  save() {
    const request = this.editing
      ? this.livrosService.update(this.editing._id!, this.livro)
      : this.livrosService.create(this.livro);

    request.subscribe(() => {
      this.loadLivros();
      this.reset();
    });
  }

  edit(livro: Livro) {
    this.editing = livro;
    this.livro = {
      titulo: livro.titulo,
      editora: livro.editora,
      preco: livro.preco,
      paginas: livro.paginas,
      autor: livro.autor._id,
    };
    this.showForm = true;
  }

  delete(id: string) {
    if (confirm('Deletar livro?')) {
      this.livrosService.delete(id).subscribe(() => this.loadLivros());
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.reset();
  }

  reset() {
    this.livro = { titulo: '', editora: '', preco: 0, paginas: 0, autor: '' };
    this.editing = null;
    this.showForm = false;
  }
}
