import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials ={
    email:'',
    password:''
  }
  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // const username=document.getElementById('username');
    // const password=document.getElementById('password');
    // console.log(username);
    // console.log(password);

    // console.log(this.credentials);
    const token=this.loginService.generateToken(this.credentials)
    console.log(token);
    
    // this.loginService.loginUser(token);
  }

}
