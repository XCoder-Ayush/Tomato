import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // setInterval(()=>{
    //   console.log('In Set Interval');
    //   if (this.loginService.isLoggedin()) {
    //     return true; // User is authenticated, allow access
    //   } else {
    //     // User is not authenticated; redirect to the login page
    //     this.router.navigate(['login']);
    //     return false;
    //   }  
    // },5000)
    if (this.loginService.isLoggedin()) {
      return true; // User is authenticated, allow access
    } else {
      // User is not authenticated; redirect to the login page
      this.router.navigate(['login']);
      return false;
    }  
}

  handleTokenExpiration() {
    // Token has expired, log out the user and redirect to the login page
    // Implement your logout logic here
    this.loginService.logoutUser();
    this.router.navigate(['login']);
  }
}
