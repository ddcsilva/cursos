import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AutoresService } from '../autores.service';
import { Autor } from '../../../models/autor.model';
import { PageContainerComponent } from '../../../shared';
import { AutorListComponent } from '../components/autor-list/autor-list.component';
import { AutorFormComponent } from '../components/autor-form/autor-form.component';
import {
  ErrorHandlerService,
  ErrorResponse,
  NotificationService,
} from '../../../core';

@Component({
  selector: 'app-autores-container',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    PageContainerComponent,
    AutorListComponent,
    AutorFormComponent,
  ],
  templateUrl: './autores-container.component.html',
  styleUrl: './autores-container.component.scss',
})
export class AutoresContainerComponent implements OnInit {
  autores: Autor[] = [];
  autorEditando: Autor | null = null;
  mostrarFormulario = false;
  carregando = false;
  salvando = false;
  erro: string | null = null;
  private lastFormData: any = null;

  constructor(
    private autoresService: AutoresService,
    private errorHandler: ErrorHandlerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.carregarAutores();
  }

  private carregarAutores() {
    this.carregando = true;
    this.erro = null;

    this.autoresService.obterTodos().subscribe({
      next: (data) => {
        this.autores = data;
        this.carregando = false;
      },
      error: (errorResponse: ErrorResponse) => {
        this.erro = this.errorHandler.getDisplayMessage(errorResponse);
        console.error('Erro ao carregar autores:', errorResponse);
        this.carregando = false;
      },
    });
  }

  toggleForm() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.autorEditando = null;
    }
  }

  handleSalvar(autorData: any) {
    this.salvando = true;
    this.erro = null;
    this.lastFormData = autorData;

    const request = this.autorEditando
      ? this.autoresService.alterar(this.autorEditando._id!, autorData)
      : this.autoresService.criar(autorData);

    request.subscribe({
      next: () => {
        this.carregarAutores();
        this.handleCancelar();

        // Notificação de sucesso
        if (this.autorEditando) {
          this.notificationService.updated('Autor');
        } else {
          this.notificationService.created('Autor');
        }
      },
      error: (errorResponse: ErrorResponse) => {
        this.erro = this.errorHandler.getDisplayMessage(errorResponse);
        console.error('Erro ao salvar autor:', errorResponse);

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

  handleEditar(autor: Autor) {
    this.autorEditando = autor;
    this.mostrarFormulario = true;
  }

  handleExcluir(autorId: string) {
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.erro = null;

      this.autoresService.excluir(autorId).subscribe({
        next: () => {
          this.carregarAutores();
          this.notificationService.deleted('Autor');
        },
        error: (errorResponse: ErrorResponse) => {
          this.erro = this.errorHandler.getDisplayMessage(errorResponse);
          console.error('Erro ao excluir autor:', errorResponse);
          this.notificationService.deleteError('autor');
        },
      });
    }
  }

  handleCancelar() {
    this.mostrarFormulario = false;
    this.autorEditando = null;
  }

  private getLastFormData() {
    return this.lastFormData;
  }
}
