import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addFoodItem(food : Food):Observable<Food> {
    const URL='http://localhost:8080/food/add';
    return this.http.post<Food>(URL,food);
  }

  getAllFoodItems():Observable<Food[]>{
    const URL='http://localhost:8080/food/get';
    return this.http.get<Food[]>(URL);  
  }
}
