import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwtToken:string='';
  currentUserEmail:string='';
  currentUserName:string='';
  currentUserRole:string='';

  constructor(private apiService : ApiService, private router : Router) { 
    // this.getCurrentUserName();
  }

  loginUser(token){
    console.log(token);
    localStorage.setItem("jwtToken",token);
    // this.router.navigate(['/']);
    window.location.href='/';

  }

  isLoggedin(){
    // 1-> Does Token Exist?
    if(localStorage.getItem('jwtToken')=='' || localStorage.getItem('jwtToken')==null || localStorage.getItem('jwtToken')==undefined)return false;
    // 2->Is Token Valid?
    const token=this.getToken();
    console.log("Heyyy");
    
    if(token){
    console.log("I Should Run");
      const decodedToken: { exp: number } = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      console.log(decodedToken.exp);
      console.log(currentTime);
      console.log(decodedToken.exp>currentTime);
      
      
      
      return decodedToken.exp > currentTime;  
    }
    console.log("I sHould not");
    
    return false;
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
      this.router.navigate(['/auth']);
    })
    return this.jwtToken;
  }


  logoutUser(){
    // No Checks Required:
    localStorage.removeItem('jwtToken');
    window.location.href='/auth';

  }

  async getCurrentUserName(){
    if(this.currentUserName==''){
      console.log("NAME");
      const resp = await lastValueFrom(this.apiService.getCurrentUser());
      this.currentUserName=resp.principal.firstName;
      this.currentUserEmail=resp.principal.email;
      this.currentUserRole=resp.principal.role;
    }
    console.log(this.currentUserRole);
    return this.currentUserName;
  }

  async getCurrentUserRole(){
    if(this.currentUserRole=='' || this.currentUserRole==null || this.currentUserRole==undefined){
      const resp = await lastValueFrom(this.apiService.getCurrentUser());
      this.currentUserName=resp.principal.firstName;
      this.currentUserEmail=resp.principal.email;
      this.currentUserRole=resp.principal.role;
    }
    console.log(this.currentUserRole);
    return this.currentUserRole;
  }

  async getCurrentUserEmail(){
    if(this.currentUserEmail=='' || this.currentUserEmail==null || this.currentUserEmail==undefined){
      const resp = await lastValueFrom(this.apiService.getCurrentUser());
      this.currentUserName=resp.principal.firstName;
      this.currentUserEmail=resp.principal.email;
      this.currentUserRole=resp.principal.role;
    }
    return this.currentUserEmail;
  }

  // registerUser(credentials: { email: string | null; password: string | null; name: string | null; about: string | null; }) {
  //   this.apiService.registerUser(credentials)    

  // }

  verifyOtpDuringRegistration(){

  }

}