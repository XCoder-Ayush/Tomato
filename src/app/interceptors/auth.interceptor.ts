import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let newRequest=request
    let token=this.loginService.getToken();
    console.log(`Inside INTERCEPTOR ${token}`);

    // if(token!=null){
    // const modifiedRequest = request=request.clone({setHeaders :{ 'Authorization' : `Bearer ${token}`}})
    // }
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
    return next.handle(request);
  }
}
