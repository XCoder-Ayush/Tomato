import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwtToken:string='';
  currentUserEmail:string='';
  currentUserName:string='';

  constructor(private apiService : ApiService, private router : Router) { }

  loginUser(token){
    console.log(token);
    localStorage.setItem("jwtToken",token);
    // this.router.navigate(['/']);
    window.location.href='/';

  }

  isLoggedin(){
    if(localStorage.getItem('jwtToken')=='' || localStorage.getItem('jwtToken')==null || localStorage.getItem('jwtToken')==undefined)return false;
    return true;
  }
  getToken(){
    return localStorage.getItem('jwtToken');
  }
  generateToken(credentials){
    this.apiService.getToken(credentials).subscribe((resp)=>{
      console.log(resp);
      const token=resp.jwtToken;
      this.jwtToken=token;
      this.loginUser(this.jwtToken)
      // this.router.navigate(['/']);
    },err=>{
      console.log(err);
      this.router.navigate(['/login']);
    })
    return this.jwtToken;
  }


  logoutUser(){
    // No Checks Required:
    localStorage.removeItem('jwtToken');
    window.location.href='/login';

  }

  async getCurrentUserName(){
    if(this.currentUserName==''){
      console.log('Hello API');
      
      const resp = await lastValueFrom(this.apiService.getCurrentUser());
      console.log(resp);
      
      this.currentUserName=resp.principal.name;
      this.currentUserEmail=resp.principal.email;

    }
    return this.currentUserName;
  }

  async getCurrentUserEmail(){
    if(this.currentUserEmail==''){
      const resp = await lastValueFrom(this.apiService.getCurrentUser());
      this.currentUserName=resp.principal.name;
      this.currentUserEmail=resp.principal.email;
    }
    return this.currentUserEmail;
  }

  
}