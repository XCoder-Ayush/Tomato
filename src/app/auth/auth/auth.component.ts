import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isSignInActive:boolean=true;
  formGroup = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  regFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    about: ['', Validators.required],
  });
  constructor(
    private loginService: LoginService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    window.addEventListener("load", () => {
      const loader = document.querySelector(".loader") as HTMLElement;
  
      if (loader) {
        loader.classList.add("loader--hidden");
  
        loader.addEventListener("transitionend", () => {
          document.body.removeChild(loader);
        });
      }
    });
  }
  onRegSubmit(){
    // console.log(this.regFormGroup);
    const emailControl = this.regFormGroup.get('email');
    const passwordControl = this.regFormGroup.get('password');
    const aboutControl=this.regFormGroup.get('about');
    const nameControl=this.regFormGroup.get('name');

    if (emailControl && passwordControl && aboutControl && nameControl) {
      const email = emailControl.value;
      const password = passwordControl.value;
      const name=nameControl.value;
      const about=aboutControl.value;
    
      const credentials = {
        email: email,
        password: password,
        name: name,
        about: about
      };
      console.log(credentials);

      const token = this.loginService.registerUser(credentials); //API Call
      console.log(token);
    }
    
  }
  onSubmit() {
    const emailControl = this.formGroup.get('email');
    const passwordControl = this.formGroup.get('password');
    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;

      const credentials = {
        email: email,
        password: password,
      };
      console.log(credentials);

      const token = this.loginService.generateToken(credentials); //API Call
      console.log(token);
    }
  }

  toggleToSignIn(){
    console.log('Sign In Toggle');
    
    const signInBtn=document.querySelectorAll('.sliderL');
    const registerBtn=document.querySelectorAll('.sliderR');
    this.isSignInActive=true
    // console.log(signInBtn);
    // console.log(registerBtn);
    
    signInBtn.forEach((element)=>{
      element.classList.add('button-active');
      element.classList.remove('button-inactive');
    })
    registerBtn.forEach((element)=>{
      element.classList.remove('button-active');
      element.classList.add('button-inactive');
    })
    
    // signInBtn.classList.remove('button-inactive');
    // signInBtn.classList.add('button-active');
    // registerBtn.classList.remove('button-active');
    // registerBtn.classList.add('button-inactive');
  }
  toggleToRegister(){
    console.log('Reg In Toggle');

    const signInBtn=document.querySelectorAll('.sliderL');
    const registerBtn=document.querySelectorAll('.sliderR');
    console.log(signInBtn);
    
    this.isSignInActive=false
    signInBtn.forEach((element)=>{
      element.classList.remove('button-active');
      element.classList.add('button-inactive');
      })
    registerBtn.forEach((element)=>{
      element.classList.remove('button-inactive');
      element.classList.add('button-active');
      })
  }
}
