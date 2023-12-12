import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthGuard } from 'src/app/guards/auth.guard';
@Injectable({
  providedIn: 'root',
})
export class TokenExpirationService {
  private checkInterval = 10000; // Check every 10 seconds
  private tokenExpired = new BehaviorSubject<boolean>(false);

  constructor(private authGuard: AuthGuard) {
    this.startTokenExpirationCheck();
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: { exp: number } = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

  private startTokenExpirationCheck() {
    timer(0, this.checkInterval).subscribe(() => {
      const token = localStorage.getItem('jwt_token'); // Get the stored token
      console.log('Getting the stored token');
      
      if (token) {
        const isExpired = this.isTokenExpired(token);
        console.log("Checking...");
        console.log(isExpired);
        
        
        this.tokenExpired.next(isExpired);
        if (isExpired) {
          console.log("Expired, Auto Logout!");
          
          this.authGuard.handleTokenExpiration();
        }
      }
    });
  }

  getTokenExpired() {
    return this.tokenExpired.asObservable();
  }
}
