// types
import { OpenWeatherMapCurrentResponse, WeatherIconCode } from "./types";

export class CurrentWeather {
  city: string;
  icon: WeatherIconCode;
  condition: string;
  temperature: number;
  description: string;
  country: string;
  feelsLike: number;
  humidity: number;
  constructor(apiResponse: OpenWeatherMapCurrentResponse) {
    this.city = apiResponse.name;
    this.icon = apiResponse.weather[0].icon;
    this.condition = apiResponse.weather[0].main;
    this.temperature = Math.round(apiResponse.main.temp);
    this.description = apiResponse.weather[0].description;
    this.country = apiResponse.sys.country;
    this.feelsLike = Math.round(apiResponse.main.feels_like);
    this.humidity = apiResponse.main.humidity;
  }
}
