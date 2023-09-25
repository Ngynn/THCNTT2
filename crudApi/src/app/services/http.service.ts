import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  add(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/form', data);
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3000/form');
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/form/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/form/${id}`, data);
  }

  

 
}
