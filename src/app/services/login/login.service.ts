import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService : ApiService, private router : Router) { }

  loginUser(token){
    console.log(token);
    localStorage.setItem("jwtToken",token);
    // location.reload();
    this.router.navigate(['/']);
  }

  isLoggedin(){
    if(localStorage.getItem('jwtToken')=='' || localStorage.getItem('jwtToken')==null || localStorage.getItem('jwtToken')==undefined)return false;
    return true;
  }
  getToken(){
    return localStorage.getItem('jwtToken');
  }
  generateToken(credentials){
    let token;
    this.apiService.getToken(credentials).subscribe((resp)=>{
      console.log(resp);
      token=resp.jwtToken;
      this.loginUser(token)
      // window.location.href="/food/get";
      this.router.navigate(['/']);
    },err=>{
      console.log(err);
      this.router.navigate(['/login']);
    })
    return token;
  }


  logoutUser(){
    // No Checks Required:
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
    location.reload();

  }

  async getCurrentUser(){
    let currentUser = await lastValueFrom(this.apiService.getCurrentUser());
    return currentUser;
  }
}
