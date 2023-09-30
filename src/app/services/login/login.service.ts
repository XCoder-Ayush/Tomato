import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService : ApiService) { }

  loginUser(token){
    console.log(token);
    localStorage.setItem("jwtToken",token);
  }

  isLoggedin(){
    return (localStorage.getItem('jwtToken')!='' || localStorage.getItem('jwtToken')!=null || localStorage.getItem('jwtToken')!=undefined);
  }

  generateToken(credentials){
    let token;
    this.apiService.getToken(credentials).subscribe((resp)=>{
      console.log(resp);
      token=resp.jwtToken;
      this.loginUser(token)
    },err=>{
      console.log(err);
    })
    return token;
  }

}
