import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LivrosService } from '../livros.service';
import { AutoresService } from '../../autores/autores.service';
import { Livro } from '../../../models/livro.model';
import { Autor } from '../../../models/autor.model';
import { PageContainerComponent } from '../../../shared';
import { LivroListComponent } from '../components/livro-list/livro-list.component';
import { LivroFormComponent } from '../components/livro-form/livro-form.component';
import {
  ErrorHandlerService,
  ErrorResponse,
  NotificationService,
} from '../../../core';

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
  erro: string | null = null;
  private lastFormData: any = null;

  constructor(
    private livrosService: LivrosService,
    private autoresService: AutoresService,
    private errorHandler: ErrorHandlerService,
    private notificationService: NotificationService
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
          this.erro = null;
          resolve();
        },
        error: (errorResponse: ErrorResponse) => {
          this.erro = this.errorHandler.getDisplayMessage(errorResponse);
          console.error('Erro ao carregar livros:', errorResponse);
          reject(errorResponse);
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
        error: (errorResponse: ErrorResponse) => {
          console.error('Erro ao carregar autores:', errorResponse);
          // Para autores, não bloqueamos a interface, apenas logamos
          resolve();
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
    this.erro = null;
    this.lastFormData = livroData;

    const request = this.livroEditando
      ? this.livrosService.alterar(this.livroEditando._id!, livroData)
      : this.livrosService.criar(livroData);

    request.subscribe({
      next: () => {
        this.carregarLivros();
        this.handleCancelar();

        // Notificação de sucesso
        if (this.livroEditando) {
          this.notificationService.updated('Livro');
        } else {
          this.notificationService.created('Livro');
        }
      },
      error: (errorResponse: ErrorResponse) => {
        this.erro = this.errorHandler.getDisplayMessage(errorResponse);
        console.error('Erro ao salvar livro:', errorResponse);

        // Notificação de erro com retry
        if (this.errorHandler.shouldRetry(errorResponse)) {
          this.notificationService.showRetryNotification(
            errorResponse.userMessage,
            () => this.handleSalvar(this.getLastFormData())
          );
        } else {
          this.notificationService.error(errorResponse.userMessage);
        }

        this.salvando = false;
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
      this.erro = null;

      this.livrosService.excluir(livroId).subscribe({
        next: () => {
          this.carregarLivros();
          this.notificationService.deleted('Livro');
        },
        error: (errorResponse: ErrorResponse) => {
          this.erro = this.errorHandler.getDisplayMessage(errorResponse);
          console.error('Erro ao excluir livro:', errorResponse);
          this.notificationService.deleteError('livro');
        },
      });
    }
  }

  handleCancelar() {
    this.mostrarFormulario = false;
    this.livroEditando = null;
  }

  private getLastFormData() {
    return this.lastFormData;
  }
}
