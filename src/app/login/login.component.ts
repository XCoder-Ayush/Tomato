import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private loginService : LoginService,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // const username=document.getElementById('username');
    // const password=document.getElementById('password');
    // console.log(username);
    // console.log(password);

    // console.log(this.credentials);
    const emailControl = this.formGroup.get('email');
    const passwordControl = this.formGroup.get('password');
    if(emailControl && passwordControl){

      const email=emailControl.value;
      const password=passwordControl.value;
      
      const credentials={
        email: email,
        password:password
      }
      console.log(credentials);
      
      const token=this.loginService.generateToken(credentials) //API Call
      console.log(token);
          
    }
    // this.loginService.loginUser(token);
  }

}
