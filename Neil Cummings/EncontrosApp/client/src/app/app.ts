import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = 'Encontros App';
  protected usuarios = signal<any>([]);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/usuarios').subscribe({
      next: (response) => this.usuarios.set(response),
      error: (error) => console.error(error),
      complete: () => console.log('Requisição realizada com sucesso'),
    });
  }
}
