import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let newRequest=request
    let token=this.loginService.getToken();
    console.log(`Inside INTERCEPTOR ${token}`);

    // if(token!=null){
    // const modifiedRequest = request=request.clone({setHeaders :{ 'Authorization' : `Bearer ${token}`}})
    // }
    console.log(request);
    let tokenString : string = 'Bearer ' + token;
    
    
    if (token) {
      console.log(tokenString);
      console.log(token);
  
      request = request.clone({setHeaders :{ 'Authorization' : tokenString}});
    }
    console.log(request);
    
    return next.handle(request);
  }
}
