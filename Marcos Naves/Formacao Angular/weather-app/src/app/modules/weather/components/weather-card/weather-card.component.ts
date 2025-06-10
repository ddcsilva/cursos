import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from '../../models/interfaces/weather.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  @Input() weatherData!: WeatherData;

  ngOnInit(): void {
    console.log('Dados recebidos do componente pai:', this.weatherData);
  }
}
