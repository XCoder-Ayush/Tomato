import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/User';
import { OneTimePassword } from 'src/app/shared/models/OneTimePassword';
@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient) { 
    console.log("Initializing API Service");
  }
  
  jwtToken=localStorage.getItem('jwtToken');

  addFoodItem(food : Food):Observable<Food> {
    const URL='http://192.168.0.104:8080/food/add';
    return this.http.post<Food>(URL,food);
  }

  getAllFoodItems():Observable<Food[]>{
    const URL='http://192.168.0.104:8080/food/get';
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${this.jwtToken}`,
    //   }),
    // };
    return this.http.get<Food[]>(URL);  
  }

  getToken(credentials):Observable<any> {
    const URL='http://192.168.0.104:8080/auth/login';
    return this.http.post<any>(URL,credentials);
  }

  getCurrentUser():Observable<any> {
    const URL = 'http://192.168.0.104:8080/auth/currentuser';
    return this.http.get<any>(URL);
  }

  getCurrentUserRole():Observable<any> {
    const URL = 'http://192.168.0.104:8080/auth/currentuserrole';
    return this.http.get<any>(URL);
  }

  // registerUser(user):Observable<any> {
  //   const URL = `http://192.168.0.104:8080/auth/createuser`;
  //   return this.http.post<any>(URL,user);
  // }
  sendOtp(regUser : User):Observable<any> {
    const URL = 'http://192.168.0.104:8080/auth/createuser';
    console.log(regUser);
    return this.http.post<any>(URL,regUser,{ responseType: 'text' as 'json'});
  }
  
  verifyOtp(oneTimePassword: OneTimePassword,regUser : User):Observable<any> {
    const URL = `http://192.168.0.104:8080/auth/verifyotp?id=${oneTimePassword.id}&oneTimePasswordCode=${oneTimePassword.oneTimePasswordCode}&expires=${oneTimePassword.expires.toISOString()}`;

    return this.http.post<any>(URL,regUser,{ responseType: 'text' as 'json'});
  }
}
