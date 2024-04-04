import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // Trial ended
  url = 'https://api.weatherapi.com/v1/current.json?key=5049bdea3fc840b89e611524241201&q=89012&aqi=no';
  // 'https://api.weatherapi.com/v1/current.json?key=5049bdea3fc840b89e611524241201&q=89012&aqi=no';

  constructor( private http: HttpClient ) { }

  getWeather(): Observable<any> {
    return this.http.get(this.url);
  }
}
