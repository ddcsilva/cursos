import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AutoresService } from '../autores.service';
import { Autor } from '../../../models/autor.model';
import { PageContainerComponent } from '../../../shared/ui';
import { AutorListComponent } from '../components/autor-list/autor-list.component';
import { AutorFormComponent } from '../components/autor-form/autor-form.component';

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

  constructor(private autoresService: AutoresService) {}

  ngOnInit() {
    this.carregarAutores();
  }

  private carregarAutores() {
    this.carregando = true;
    this.autoresService.obterTodos().subscribe({
      next: (data) => {
        this.autores = data;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar autores:', error);
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
    const request = this.autorEditando
      ? this.autoresService.alterar(this.autorEditando._id!, autorData)
      : this.autoresService.criar(autorData);

    request.subscribe({
      next: () => {
        this.carregarAutores();
        this.handleCancelar();
      },
      error: (error) => {
        console.error('Erro ao salvar autor:', error);
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
      this.autoresService.excluir(autorId).subscribe({
        next: () => {
          this.carregarAutores();
        },
        error: (error) => {
          console.error('Erro ao excluir autor:', error);
        },
      });
    }
  }

  handleCancelar() {
    this.mostrarFormulario = false;
    this.autorEditando = null;
  }
}
