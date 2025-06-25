import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../../models/livro.model';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly urlBase = API_CONFIG.urlBase + API_CONFIG.endpoints.livros;

  constructor(private http: HttpClient) {}

  obterTodos(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.urlBase);
  }

  obterPorId(id: string): Observable<Livro> {
    return this.http.get<Livro>(`${this.urlBase}/${id}`);
  }

  criar(
    livro: Omit<Livro, '_id' | 'autor'> & { autor: string }
  ): Observable<any> {
    return this.http.post(this.urlBase, livro);
  }

  alterar(id: string, livro: Partial<Livro>): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, livro);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
