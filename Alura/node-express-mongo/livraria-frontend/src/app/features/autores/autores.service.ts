import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../../models/autor.model';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  private readonly urlBase = API_CONFIG.urlBase + API_CONFIG.endpoints.autores;

  constructor(private http: HttpClient) {}

  obterTodos(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.urlBase);
  }

  obterPorId(id: string): Observable<Autor> {
    return this.http.get<Autor>(`${this.urlBase}/${id}`);
  }

  criar(autor: Omit<Autor, '_id'>): Observable<any> {
    return this.http.post(this.urlBase, autor);
  }

  alterar(id: string, autor: Partial<Autor>): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, autor);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
