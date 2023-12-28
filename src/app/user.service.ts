import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
 providedIn: 'root'
})

export class UserService {
 url = 'http://localhost:3000';
 
 constructor(private http: HttpClient) { }
 
 getUsers(): Observable<any> {
   return this.http.get(this.url + '/users');
 }
}