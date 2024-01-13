import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bikes } from '../shared/bikes.model';
 
@Injectable({
 providedIn: 'root'
})
export class BikesService {

 url = 'http://localhost:3000';

 constructor(private http: HttpClient) { }
 
  getAllProducts(): Observable<any> {
    return this.http.get(this.url + '/bikes');
  }

  create(payload: Bikes) {
    return this.http.post<Bikes>(this.url + '/bikes', payload);
  }

  delete(id:string) {
    return this.http.delete<Bikes>(this.url + '/bikes/' + id);
  }

  getById(id: string) {
    return this.http.get<Bikes>(this.url + '/bikes/' + id);
  }

  update(id:string, payload:Bikes) {
    return this.http.put(this.url + '/bikes/' + id, payload);
  }

}