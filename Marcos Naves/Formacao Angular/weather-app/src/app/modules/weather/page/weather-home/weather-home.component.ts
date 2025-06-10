import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../models/interfaces/weather.interface';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
})
export class WeatherHomeComponent implements OnInit {
  initialCity = 'Jacareí';
  weatherData!: WeatherData;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.initialCity);
  }

  getWeatherData(city: string): void {
    this.weatherService.getWeatherData(city).subscribe({
      next: (response) => {
        response && (this.weatherData = response);
        console.log(this.weatherData);
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      },
    });
  }
}
