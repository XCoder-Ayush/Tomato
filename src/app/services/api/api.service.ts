import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/User';
import { OneTimePassword } from 'src/app/shared/models/OneTimePassword';
import { Category } from 'src/app/shared/models/category.model';
import { Address } from 'src/app/shared/models/Address';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    console.log('Initializing API Service');
  }

  jwtToken = localStorage.getItem('jwtToken');

  addFoodItem(food: Food): Observable<Food> {
    const URL = 'http://localhost:8080/food/add';
    return this.http.post<Food>(URL, food);
  }

  getFoodItems(): Observable<Food[]> {
    const URL = 'http://localhost:8080/food/get';
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${this.jwtToken}`,
    //   }),
    // };
    return this.http.get<Food[]>(URL);
  }

  getToken(credentials): Observable<any> {
    const URL = 'http://localhost:8080/auth/login';
    console.log('In Api Service');

    return this.http.post<any>(URL, credentials);
  }

  getCurrentUser(): Observable<any> {
    const URL = 'http://localhost:8080/auth/currentuser';
    return this.http.get<any>(URL);
  }

  getCurrentUserRole(): Observable<any> {
    const URL = 'http://localhost:8080/auth/currentuserrole';
    return this.http.get<any>(URL);
  }

  // registerUser(user):Observable<any> {
  //   const URL = `http://localhost:8080/auth/createuser`;
  //   return this.http.post<any>(URL,user);
  // }

  sendOtp(regUser: User): Observable<any> {
    const URL = 'http://localhost:8080/auth/createuser';
    console.log(regUser);
    return this.http.post<any>(URL, regUser, {
      responseType: 'text' as 'json',
    });
  }

  verifyOtp(oneTimePassword: OneTimePassword, regUser: User): Observable<any> {
    const URL = `http://localhost:8080/auth/verifyotp?id=${
      oneTimePassword.id
    }&oneTimePasswordCode=${
      oneTimePassword.oneTimePasswordCode
    }&expires=${oneTimePassword.expires.toISOString()}`;

    return this.http.post<any>(URL, regUser, {
      responseType: 'text' as 'json',
    });
  }

  getOrder(orderId: string): Observable<any> {
    const URL = `http://localhost:8081/api/v1/orders/${orderId}`;
    return this.http.get<any>(URL);
  }

  getCategories(): Observable<Category[]> {
    const URL = `http://localhost:8080/category`;
    return this.http.get<any>(URL);
  }

  fetchAddressesOfUser(userId): Observable<Address[]> {
    const URL = `http://localhost:8080/api/address/${userId}`;
    return this.http.get<any>(URL);
  }

  fetchLocationOfDeliveryAgent(deliveryAgentId):Observable<any> {
    const URL = `http://localhost:8082/get/${deliveryAgentId}`;
    return this.http.get<any>(URL);
  }
}
