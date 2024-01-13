import { Component } from '@angular/core';
import { WeatherService } from './edit-products/shared/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Product Manager';
  temp = '';
  location = '';
  region = '';
  constructor( private weatherService: WeatherService ) {}

  ngOnInit() {
  this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather()
    .subscribe({
      next:(data: any) => {
        this.temp = data.current.temp_f;
        this.location = data.location.name;
        this.region = data.location.region;
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }

}