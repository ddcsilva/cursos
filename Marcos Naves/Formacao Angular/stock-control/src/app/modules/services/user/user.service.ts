import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../../models/interfaces/user/user-request.interface';
import { UserResponse } from '../../models/interfaces/user/user-response.interface';
import { AuthRequest } from '../../models/interfaces/auth/auth-request.interface';
import { AuthResponse } from '../../models/interfaces/auth/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  signup(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/users`, user);
  }

  auth(auth: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, auth);
  }
}
