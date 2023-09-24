import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coffee } from '../model/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private http: HttpClient) { }

  addCoffee(coffee: any): Observable<any> {
    return this.http.post('http://localhost:3000/coffee', coffee);
  }

  getCoffeeList(): Observable<any> {
    return this.http.get<Coffee[]>('http://localhost:3000/coffee');
  }

  deleteCoffee(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/coffee/${id}`);
  }

  updateCoffee(id: number, coffee: any): Observable<any> {
    return this.http.put(`http://localhost:3000/coffee/${id}`, coffee);
  } 
}
