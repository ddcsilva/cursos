import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'f8e040f1c008683de7b4a3eb40cdbd41';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private units = 'metric';
  private mode = 'json';

  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<any> {
    return this.http
      .get(
        `${this.apiUrl}?q=${city}&units=${this.units}&mode=${this.mode}&appid=${this.apiKey}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Preserva o erro original para que o componente possa tratar adequadamente
    return throwError(() => error);
  }
}
