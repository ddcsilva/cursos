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
  editando: Autor | null = null;
  mostrarFormulario = false;
  carregando = false;

  constructor(private autoresService: AutoresService) {}

  ngOnInit() {
    this.carregarAutores();
  }

  carregarAutores() {
    this.carregando = true;
    this.autoresService.obterTodos().subscribe({
      next: (data) => {
        this.autores = data;
        this.carregando = false;
      },
      error: () => (this.carregando = false),
    });
  }

  salvar() {
    const request = this.editando
      ? this.autoresService.alterar(this.editando._id!, this.autor)
      : this.autoresService.criar(this.autor);

    request.subscribe(() => {
      this.carregarAutores();
      this.limpar();
    });
  }

  editar(autor: Autor) {
    this.editando = autor;
    this.autor = { nome: autor.nome, nacionalidade: autor.nacionalidade };
    this.mostrarFormulario = true;
  }

  excluir(id: string) {
    if (confirm('Excluir autor?')) {
      this.autoresService.excluir(id).subscribe(() => this.carregarAutores());
    }
  }

  alternarFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) this.limpar();
  }

  limpar() {
    this.autor = { nome: '', nacionalidade: '' };
    this.editando = null;
    this.mostrarFormulario = false;
  }
}
