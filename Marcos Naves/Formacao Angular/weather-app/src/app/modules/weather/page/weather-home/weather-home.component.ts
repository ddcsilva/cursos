import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../models/interfaces/weather.interface';
import { Subject, takeUntil } from 'rxjs';
import {
  faMagnifyingGlass,
  faSpinner,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCity = 'Jacareí';
  weatherData!: WeatherData;
  searchIcon = faMagnifyingGlass;
  spinnerIcon = faSpinner;
  errorIcon = faTriangleExclamation;

  // Estados da aplicação
  isLoading = false;
  hasError = false;
  errorMessage = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.initialCity);
  }

  getWeatherData(city: string): void {
    if (!city || city.trim() === '') {
      this.showError('Por favor, digite o nome de uma cidade.');
      return;
    }

    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.weatherService
      .getWeatherData(city.trim())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response) {
            this.weatherData = response;
            this.hasError = false;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.handleError(error);
        },
      });
  }

  private handleError(error: any): void {
    console.error('Error fetching weather data:', error);

    if (error.status === 404) {
      this.showError(
        'Cidade não encontrada. Verifique o nome e tente novamente.'
      );
    } else if (error.status === 0) {
      this.showError(
        'Sem conexão com a internet. Verifique sua conexão e tente novamente.'
      );
    } else if (error.status >= 500) {
      this.showError(
        'Serviço temporariamente indisponível. Tente novamente em alguns minutos.'
      );
    } else if (error.status === 401) {
      this.showError('Erro de autenticação. Chave da API inválida.');
    } else {
      this.showError('Erro inesperado. Tente novamente.');
    }
  }

  private showError(message: string): void {
    this.hasError = true;
    this.errorMessage = message;
    this.weatherData = null as any;
  }

  onSubmit(): void {
    if (!this.initialCity || this.initialCity.trim() === '') {
      this.showError('Por favor, digite o nome de uma cidade.');
      return;
    }

    this.getWeatherData(this.initialCity);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
