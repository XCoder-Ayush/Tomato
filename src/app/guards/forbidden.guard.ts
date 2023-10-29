import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const userRole = await this.getRole(); // Wait for the getRole function to complete

    if (userRole === "ADMIN") {
      return true;
    } else {
      this.router.navigate(['forbidden']);
      return false;
    }
  }

  private async getRole() {
    const resp = await this.loginService.getCurrentUserRole(); // Wait for the network call to complete
    console.log(resp);
    return resp;
  }
}
