import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LivrosService } from '../livros.service';
import { AutoresService } from '../../autores/autores.service';
import { Livro } from '../../../models/livro.model';
import { Autor } from '../../../models/autor.model';
import { PageContainerComponent } from '../../../shared/ui';
import { LivroListComponent } from '../components/livro-list/livro-list.component';
import { LivroFormComponent } from '../components/livro-form/livro-form.component';

@Component({
  selector: 'app-livros-container',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    PageContainerComponent,
    LivroListComponent,
    LivroFormComponent,
  ],
  templateUrl: './livros-container.component.html',
  styleUrl: './livros-container.component.scss',
})
export class LivrosContainerComponent implements OnInit {
  livros: Livro[] = [];
  autores: Autor[] = [];
  livroEditando: Livro | null = null;
  mostrarFormulario = false;
  carregando = false;
  salvando = false;

  constructor(
    private livrosService: LivrosService,
    private autoresService: AutoresService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  private async carregarDados() {
    this.carregando = true;
    try {
      await Promise.all([this.carregarLivros(), this.carregarAutores()]);
    } finally {
      this.carregando = false;
    }
  }

  private carregarLivros(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.livrosService.obterTodos().subscribe({
        next: (data) => {
          this.livros = data;
          resolve();
        },
        error: (error) => {
          console.error('Erro ao carregar livros:', error);
          reject(error);
        },
      });
    });
  }

  private carregarAutores(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.autoresService.obterTodos().subscribe({
        next: (data) => {
          this.autores = data;
          resolve();
        },
        error: (error) => {
          console.error('Erro ao carregar autores:', error);
          reject(error);
        },
      });
    });
  }

  toggleForm() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.livroEditando = null;
    }
  }

  handleSalvar(livroData: any) {
    this.salvando = true;
    const request = this.livroEditando
      ? this.livrosService.alterar(this.livroEditando._id!, livroData)
      : this.livrosService.criar(livroData);

    request.subscribe({
      next: () => {
        this.carregarLivros();
        this.handleCancelar();
      },
      error: (error) => {
        console.error('Erro ao salvar livro:', error);
        // Aqui você pode adicionar notificação de erro
      },
      complete: () => {
        this.salvando = false;
      },
    });
  }

  handleEditar(livro: Livro) {
    this.livroEditando = livro;
    this.mostrarFormulario = true;
  }

  handleExcluir(livroId: string) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livrosService.excluir(livroId).subscribe({
        next: () => {
          this.carregarLivros();
        },
        error: (error) => {
          console.error('Erro ao excluir livro:', error);
          // Aqui você pode adicionar notificação de erro
        },
      });
    }
  }

  handleCancelar() {
    this.mostrarFormulario = false;
    this.livroEditando = null;
  }
}
