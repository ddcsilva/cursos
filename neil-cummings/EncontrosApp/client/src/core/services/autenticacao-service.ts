import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private http = inject(HttpClient);
  private urlBase = 'https://localhost:5001/api/';

  login(credenciais: any) {
    return this.http.post(this.urlBase + 'autenticacao/login', credenciais);
  }
}
