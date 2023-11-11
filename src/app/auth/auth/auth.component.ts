import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { ResponseType } from 'src/app/shared/response-type';
import { OneTimePassword } from 'src/app/shared/models/OneTimePassword';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  regDetailsFilled:boolean=true;
  otpFilled:boolean=true;
  isSignInActive:boolean=true;
  oneTimePassword:OneTimePassword={
    id:'',
    oneTimePasswordCode: 0,
    expires: new Date()
  };
  regUser:User={
    firstName: '',
    lastName: '',
    role: '',
    about: '',
    email: '',
    password: '',
    userId: ''
  }
  constructor(
    private loginService: LoginService,
    private _formBuilder: FormBuilder,
    private renderer : Renderer2,
    private apiService : ApiService
  ) {}

  formGroup: FormGroup= this._formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });
  regFormGroup: FormGroup = this._formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required,this.passwordValidator()],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    about: ['', Validators.required],
  });
  otpForm: FormGroup = this._formBuilder.group({
    otp1: ['', [Validators.required, Validators.maxLength(1)]],
    otp2: ['', [Validators.required, Validators.maxLength(1)]],
    otp3: ['', [Validators.required, Validators.maxLength(1)]],
    otp4: ['', [Validators.required, Validators.maxLength(1)]],
    otp5: ['', [Validators.required, Validators.maxLength(1)]],
    otp6: ['', [Validators.required, Validators.maxLength(1)]],
  });

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

    this.regFormGroup.valueChanges.subscribe(() => {
      this.updateRegDetailsFilled();
    });

    this.otpForm.valueChanges.subscribe(()=>{
      this.updateOtpFilled();
    })
  }
  updateRegDetailsFilled() {
    this.regDetailsFilled = this.regFormGroup.invalid;
  }
  updateOtpFilled(){
    this.otpFilled=this.otpForm.invalid;
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value: string = control.value;
      // Use a regular expression to check for at least 8 characters with one upper, one lower, one digit, and one special character
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(value)) {
        return { 'invalidPassword': true };
      }
      return null;
    };
  }

  onRegSubmit(){
    const emailControl = this.regFormGroup.get('email');
    const passwordControl = this.regFormGroup.get('password');
    const aboutControl=this.regFormGroup.get('about');
    const firstNameControl=this.regFormGroup.get('firstName');
    const lastNameControl=this.regFormGroup.get('lastName');


    if (emailControl && passwordControl && aboutControl && firstNameControl && lastNameControl) {
      const email = emailControl.value;
      const password = passwordControl.value;
      const firstName=firstNameControl.value;
      const lastName=lastNameControl.value;
      const about=aboutControl.value;
    
      // const credentials = {
      //   email: email,
      //   password: password,
      //   firstName: firstName,
      //   lastName: lastName,
      //   about: about
      // };
      // console.log(credentials);
      this.regUser.email=email;
      this.regUser.password=password;
      this.regUser.firstName=firstName;
      this.regUser.lastName=lastName;
      this.regUser.about=about;
      console.log(this.regUser);
      this.sendOtp();
      /*
      const token = this.loginService.registerUser(credentials); //API Call
      console.log(token);
      */
    }
    
  }
  onLoginSubmit() {
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
    
    signInBtn.forEach((element)=>{
      element.classList.add('button-active');
      element.classList.remove('button-inactive');
    })
    registerBtn.forEach((element)=>{
      element.classList.remove('button-active');
      element.classList.add('button-inactive');
    })
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
  shiftFocus(event, nextInputId) {
    const maxLength = event.target.maxLength;
    const currentLength = event.target.value.length;
    console.log(event);
    console.log(nextInputId);
    console.log(maxLength);
    console.log(currentLength);
    
    if (currentLength === maxLength) {
      const nextInput = document.getElementById(nextInputId);

      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  async onOtpSubmit(){
    let oneTimePasswordCode=(this.otpForm.value.otp1+this.otpForm.value.otp2+this.otpForm.value.otp3+this.otpForm.value.otp4+this.otpForm.value.otp5+this.otpForm.value.otp6);
    this.oneTimePassword.oneTimePasswordCode=oneTimePasswordCode as number;
    this.oneTimePassword.expires=new Date();
    console.log(this.oneTimePassword);

    // REST API Call:
    const resp=await this.apiService.verifyOtp(this.oneTimePassword,this.regUser).toPromise();

    if(resp===ResponseType.WrongOTP){
      console.log("Wrong OTP");
      return;
    }
    if(resp===ResponseType.OTPExpired){
      console.log("OTP Expired");
      return;
    }

    console.log(ResponseType.OTPVerified);
    
  }

  async sendOtp(){
    console.log('In Send Otp');
    // REST API call
    console.log(this.regUser)
    const resp :any= await this.apiService.sendOtp(this.regUser).toPromise();

    if(resp===ResponseType.UserExists){
      console.log("User Exists");
      return;
    }
    if(resp===ResponseType.InvalidEmail){
      console.log("Invalid Email");
      return;
    }
    console.log(resp);
    this.oneTimePassword.id=resp as string;
    
    const otpForm=document.querySelector('.otpForm') as HTMLElement;
    const regForm=document.querySelector('.regForm') as HTMLElement;
    const socialAuth=document.querySelector('.social-auth') as HTMLElement;

    regForm!.style.display='none';
    socialAuth!.style.display='none';
    otpForm!.style.display='block';

    const resendButton = document.querySelector('#resend-btn') as HTMLButtonElement;

    if (resendButton && !resendButton.classList.contains('disabled')) {
      let countdown = 30; // Initial countdown value in seconds
      resendButton.classList.add('disabled');
  
      const intervalId = setInterval(() => {
        countdown--;
  
        if (countdown <= 0) {
          clearInterval(intervalId); // Stop the interval when countdown reaches 0
          resendButton.classList.remove('disabled');
          resendButton.textContent = 'Resend'; // Reset the button text
        } else {
          resendButton.textContent = `Resend (${countdown}s)`;
        }
      }, 1000); // Update every 1000 milliseconds (1 second)
    }
  }
  backToRegForm(){
    const otpForm=document.querySelector('.otpForm') as HTMLElement;
    const regForm=document.querySelector('.regForm') as HTMLElement;
    const socialAuth=document.querySelector('.social-auth') as HTMLElement;
    regForm!.style.display='block';
    socialAuth!.style.display='block';
    otpForm!.style.display='none';
   
  }
}