import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  regDetailsFilled:boolean=true;
  otpFilled:boolean=true;
  isSignInActive:boolean=true;
  formGroup = this._formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });
  regFormGroup = this._formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required,this.passwordValidator()],
    name: ['', Validators.required],
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
  constructor(
    private loginService: LoginService,
    private _formBuilder: FormBuilder,
    private renderer : Renderer2
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

    this.regFormGroup.valueChanges.subscribe(() => {
      this.updateRegDetailsFilled();
    });
    this.otpForm.valueChanges.subscribe(()=>{
      this.updateOtpFilled();
    })
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

      this.sendOtp();
      /*
      const token = this.loginService.registerUser(credentials); //API Call
      console.log(token);
      */
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
  updateRegDetailsFilled() {
    this.regDetailsFilled = this.regFormGroup.invalid;
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
  onOtpSubmit(){
    console.log(this.otpForm);
  }
  updateOtpFilled(){
    this.otpFilled=this.otpForm.invalid;
  }
  sendOtp(){
    console.log('In Send Otp');
    
    const otpForm=document.querySelector('.otpForm') as HTMLElement;
    const regForm=document.querySelector('.regForm') as HTMLElement;

    regForm!.style.display='none';
    otpForm!.style.display='block';

    const resendButton = document.querySelector('#resend-btn') as HTMLButtonElement;
    // if (resendButton) {
      // this.renderer.setAttribute(resendButton, 'disabled', 'true');
      // this.renderer.addClass(resendButton, 'disabled');
    // }
    
    // setTimeout(() => {
    //   this.renderer.removeAttribute(resendButton, 'disabled');
    //   this.renderer.removeClass(resendButton, 'disabled');
    // }, 1000*30); 

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
}
