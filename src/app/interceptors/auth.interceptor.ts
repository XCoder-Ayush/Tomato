import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.loginService.getToken();
    console.log(`Inside INTERCEPTOR ${token}`);
    let tokenString: string = 'Bearer ' + token;
    if (token != null && token != undefined && token != '') {
      request = request.clone({ setHeaders: { Authorization: tokenString } });
    }
    return next.handle(request);
  }
}
