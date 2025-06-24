import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../../models/livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly baseUrl = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseUrl);
  }

  getById(id: string): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/${id}`);
  }

  create(
    livro: Omit<Livro, '_id' | 'autor'> & { autor: string }
  ): Observable<any> {
    return this.http.post(this.baseUrl, livro);
  }

  update(id: string, livro: Partial<Livro>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, livro);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
