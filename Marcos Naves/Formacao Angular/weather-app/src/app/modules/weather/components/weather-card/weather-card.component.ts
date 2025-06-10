import { Component, Input } from '@angular/core';
import { WeatherData } from '../../models/interfaces/weather.interface';
import {
  faDroplet,
  faTemperatureHigh,
  faTemperatureLow,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  // Dados da previsão do tempo recebidos pelo componente pai
  @Input() weatherData!: WeatherData;

  minTemperaturaIcon = faTemperatureLow;
  maxTemperaturaIcon = faTemperatureHigh;
  humidityIcon = faDroplet;
  windIcon = faWind;
}
