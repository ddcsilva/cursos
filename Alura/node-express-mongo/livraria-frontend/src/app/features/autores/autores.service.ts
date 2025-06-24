import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../../models/autor.model';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  private readonly baseUrl = 'http://localhost:3000/autores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.baseUrl);
  }

  getById(id: string): Observable<Autor> {
    return this.http.get<Autor>(`${this.baseUrl}/${id}`);
  }

  create(autor: Omit<Autor, '_id'>): Observable<any> {
    return this.http.post(this.baseUrl, autor);
  }

  update(id: string, autor: Partial<Autor>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, autor);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
