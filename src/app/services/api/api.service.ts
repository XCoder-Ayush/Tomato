import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  jwtToken=localStorage.getItem('jwtToken');

  addFoodItem(food : Food):Observable<Food> {
    const URL='http://localhost:8080/food/add';
    return this.http.post<Food>(URL,food);
  }

  getAllFoodItems():Observable<Food[]>{
    const URL='http://localhost:8080/food/get';
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${this.jwtToken}`,
    //   }),
    // };
    return this.http.get<Food[]>(URL);  
  }

  getToken(credentials):Observable<any> {
    const URL='http://localhost:8080/auth/login';
    return this.http.post<any>(URL,credentials);
  }

  getCurrentUser():Observable<any> {
    const URL='http://localhost:8080/auth/currentuser';
    return this.http.get<any>(URL);
  }
}
