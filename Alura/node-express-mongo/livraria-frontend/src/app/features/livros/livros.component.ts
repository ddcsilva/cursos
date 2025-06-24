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
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.scss',
})
export class LivrosComponent implements OnInit {
  livros: Livro[] = [];
  autores: Autor[] = [];
  livro: any = { titulo: '', editora: '', preco: 0, paginas: 0, autor: '' };
  editando: Livro | null = null;
  mostrarFormulario = false;
  carregando = false;

  constructor(
    private livrosService: LivrosService,
    private autoresService: AutoresService
  ) {}

  ngOnInit() {
    this.carregarLivros();
    this.carregarAutores();
  }

  carregarLivros() {
    this.carregando = true;
    this.livrosService.obterTodos().subscribe({
      next: (data) => {
        this.livros = data;
        this.carregando = false;
      },
      error: () => (this.carregando = false),
    });
  }

  carregarAutores() {
    this.autoresService.obterTodos().subscribe((data) => (this.autores = data));
  }

  salvar() {
    const request = this.editando
      ? this.livrosService.alterar(this.editando._id!, this.livro)
      : this.livrosService.criar(this.livro);

    request.subscribe(() => {
      this.carregarLivros();
      this.limpar();
    });
  }

  editar(livro: Livro) {
    this.editando = livro;
    this.livro = {
      titulo: livro.titulo,
      editora: livro.editora,
      preco: livro.preco,
      paginas: livro.paginas,
      autor: livro.autor?._id || '',
    };
    this.mostrarFormulario = true;
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livrosService.excluir(id).subscribe(() => this.carregarLivros());
    }
  }

  alternarFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) this.limpar();
  }

  limpar() {
    this.livro = { titulo: '', editora: '', preco: 0, paginas: 0, autor: '' };
    this.editando = null;
    this.mostrarFormulario = false;
  }

  // Função para otimizar performance com trackBy
  trackByLivro(index: number, livro: Livro): string {
    return livro._id || index.toString();
  }
}
