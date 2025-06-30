import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  http = inject(HttpClient);
  titulo = 'EncontrosApp';
  usuarios: any;

  ngOnInit() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.usuarios = response),
      error: (error) => console.error(error),
      complete: () => console.log('Requisição completa'),
    });
  }
}
