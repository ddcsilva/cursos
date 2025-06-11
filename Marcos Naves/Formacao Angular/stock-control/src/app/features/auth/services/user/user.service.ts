import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../../../../shared/models/interfaces/user/user-request.interface';
import { UserResponse } from '../../../../shared/models/interfaces/user/user-response.interface';
import { AuthRequest } from '../../../../shared/models/interfaces/auth/auth-request.interface';
import { AuthResponse } from '../../../../shared/models/interfaces/auth/auth-response.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  signup(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/user`, user);
  }

  auth(auth: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, auth);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !!token;
  }

  logout(): void {
    this.cookieService.delete('token');
  }

  getToken(): string | null {
    const token = this.cookieService.get('token');
    return token || null;
  }
}
