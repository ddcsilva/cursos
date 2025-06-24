import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>📚 Livraria</span>
      <div>
        <button mat-button routerLink="/livros" routerLinkActive="active">
          Livros
        </button>
        <button mat-button routerLink="/autores" routerLinkActive="active">
          Autores
        </button>
      </div>
    </mat-toolbar>
    <router-outlet />
  `,
  styles: [
    `
      mat-toolbar {
        display: flex;
        justify-content: space-between;
      }
      .active {
        background: rgba(255, 255, 255, 0.1);
      }
    `,
  ],
})
export class AppComponent {}
