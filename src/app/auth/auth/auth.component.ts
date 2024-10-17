import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { ResponseType } from 'src/app/shared/response-type';
import { OneTimePassword } from 'src/app/shared/models/OneTimePassword';
import * as Noty from 'noty';
import { AuthConstants } from 'src/app/enums/auth.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginDetailsFilled: boolean = true;
  regDetailsFilled: boolean = true;
  otpFilled: boolean = true;
  isSignInActive: boolean = true;
  oneTimePassword: OneTimePassword = {
    id: '',
    oneTimePasswordCode: 0,
    expires: new Date(),
  };
  regUser: User = {
    firstName: '',
    lastName: '',
    role: '',
    about: '',
    email: '',
    password: '',
    userId: '',
    phone: '',
  };
  constructor(
    private loginService: LoginService,
    private _formBuilder: FormBuilder,
    private renderer: Renderer2,
    private apiService: ApiService
  ) {}

  loginFormGroup: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  regFormGroup: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator()]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    about: ['', Validators.required],
  });
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value: string = control.value;
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(value)) {
        return { invalidPassword: true };
      }
      return null;
    };
  }
  otpForm: FormGroup = this._formBuilder.group({
    otp1: ['', [Validators.required, Validators.maxLength(1)]],
    otp2: ['', [Validators.required, Validators.maxLength(1)]],
    otp3: ['', [Validators.required, Validators.maxLength(1)]],
    otp4: ['', [Validators.required, Validators.maxLength(1)]],
    otp5: ['', [Validators.required, Validators.maxLength(1)]],
    otp6: ['', [Validators.required, Validators.maxLength(1)]],
  });

  ngOnInit(): void {
    window.addEventListener('load', () => {
      const loader = document.querySelector('.loader') as HTMLElement;
      if (loader) {
        loader.classList.add('loader--hidden');
        loader.addEventListener('transitionend', () => {
          const parentElement = loader.parentElement;
          if (parentElement) {
            parentElement.removeChild(loader);
          }
        });
      }
    });

    this.regFormGroup.valueChanges.subscribe(() => {
      this.updateRegDetailsFilled();
    });
    this.loginFormGroup.valueChanges.subscribe(() => {
      this.updateLoginDetailsFilled();
    });

    this.otpForm.valueChanges.subscribe(() => {
      this.updateOtpFilled();
    });
  }
  updateRegDetailsFilled() {
    this.regDetailsFilled = this.regFormGroup.invalid;
  }
  updateLoginDetailsFilled() {
    this.loginDetailsFilled = this.loginFormGroup.invalid;
  }
  updateOtpFilled() {
    this.otpFilled = this.otpForm.invalid;
  }

  async onLoginSubmit() {
    const emailControl = this.loginFormGroup.get('email');
    const passwordControl = this.loginFormGroup.get('password');
    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;

      const credentials = {
        email: email,
        password: password,
      };
      //REST API Call
      const token = await this.loginService.generateToken(credentials);
      if (token == AuthConstants.USER_NOT_FOUND) {
        new Noty({
          layout: 'topRight',
          type: 'error',
          text: 'User Not Found, Please Register!!',
          theme: 'metroui',
          timeout: 5000,
        }).show();
      } else if (token == AuthConstants.WRONG_PASSWORD) {
        new Noty({
          layout: 'topRight',
          type: 'error',
          text: 'Wrong Password, Try Again!',
          theme: 'metroui',
          timeout: 5000,
        }).show();
      } else {
        new Noty({
          layout: 'topRight',
          type: 'success',
          text: 'Welcome To Tomato',
          theme: 'metroui',
          timeout: 2000,
        }).show();
      }
    }
  }

  onRegSubmit() {
    const emailControl = this.regFormGroup.get('email');
    const passwordControl = this.regFormGroup.get('password');
    const aboutControl = this.regFormGroup.get('about');
    const firstNameControl = this.regFormGroup.get('firstName');
    const lastNameControl = this.regFormGroup.get('lastName');

    if (
      emailControl &&
      passwordControl &&
      aboutControl &&
      firstNameControl &&
      lastNameControl
    ) {
      const email = emailControl.value;
      const password = passwordControl.value;
      const firstName = firstNameControl.value;
      const lastName = lastNameControl.value;
      const about = aboutControl.value;

      this.regUser.email = email;
      this.regUser.password = password;
      this.regUser.firstName = firstName;
      this.regUser.lastName = lastName;
      this.regUser.about = about;

      this.sendOtp();
    }
  }
  async sendOtp() {
    // REST API call
    const resp: any = await this.apiService.sendOtp(this.regUser).toPromise();

    if (resp === ResponseType.UserExists) {
      const noty = new Noty({
        layout: 'topRight',
        type: 'error',
        text: 'User Already Exists. Try With Different Email',
        theme: 'metroui',
        timeout: 5000,
      });
      noty.show();
      return;
    }
    if (resp === ResponseType.InvalidEmail) {
      const noty = new Noty({
        layout: 'topRight',
        type: 'error',
        text: 'Invalid Email. Try With Different Email',
        theme: 'metroui',
        timeout: 5000,
      });
      noty.show();
      return;
    }
    const noty = new Noty({
      layout: 'topRight',
      type: 'success',
      text: 'OTP Sent Successfully',
      theme: 'metroui',
      timeout: 5000,
    });
    noty.show();
    console.log(resp);

    this.oneTimePassword.id = resp as string;

    const otpForm = document.querySelector('.otpForm') as HTMLElement;
    const regForm = document.querySelector('.regForm') as HTMLElement;
    const socialAuth = document.querySelector('.social-auth') as HTMLElement;

    regForm!.style.display = 'none';
    socialAuth!.style.display = 'none';
    otpForm!.style.display = 'block';

    const resendButton = document.querySelector(
      '#resend-btn'
    ) as HTMLButtonElement;

    if (resendButton && !resendButton.classList.contains('disabled')) {
      let countdown = 30;
      resendButton.classList.add('disabled');

      const intervalId = setInterval(() => {
        countdown--;

        if (countdown <= 0) {
          clearInterval(intervalId);
          resendButton.classList.remove('disabled');
          resendButton.textContent = 'Resend';
        } else {
          resendButton.textContent = `Resend (${countdown}s)`;
        }
      }, 1000); // Update every 1000 milliseconds (1 second)
    }
  }

  async onOtpSubmit() {
    let oneTimePasswordCode =
      this.otpForm.value.otp1 +
      this.otpForm.value.otp2 +
      this.otpForm.value.otp3 +
      this.otpForm.value.otp4 +
      this.otpForm.value.otp5 +
      this.otpForm.value.otp6;

    this.oneTimePassword.oneTimePasswordCode = oneTimePasswordCode as number;
    this.oneTimePassword.expires = new Date();

    // REST API Call:
    const resp = await this.apiService
      .verifyOtp(this.oneTimePassword, this.regUser)
      .toPromise();

    if (resp === ResponseType.WrongOTP) {
      const noty = new Noty({
        layout: 'topRight',
        type: 'error',
        text: 'Wrong OTP!!',
        theme: 'metroui',
        timeout: 5000,
      });
      noty.show();
      return;
    }
    if (resp === ResponseType.OTPExpired) {
      const noty = new Noty({
        layout: 'topRight',
        type: 'error',
        text: 'OTP Expired!!',
        theme: 'metroui',
        timeout: 5000,
      });
      noty.show();
      return;
    }
    const noty = new Noty({
      layout: 'topRight',
      type: 'success',
      text: 'OTP Verified Successfully!!',
      theme: 'metroui',
      timeout: 5000,
    });
    noty.show();
    new Noty({
      layout: 'topRight',
      type: 'success',
      text: 'User Registered Successfully. Please Login Now.',
      theme: 'metroui',
      timeout: 5000,
    }).show();
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  toggleToSignIn() {
    console.log('Sign In Toggle');

    const signInBtn = document.querySelectorAll('.sliderL');
    const registerBtn = document.querySelectorAll('.sliderR');
    this.isSignInActive = true;

    signInBtn.forEach((element) => {
      element.classList.add('button-active');
      element.classList.remove('button-inactive');
    });
    registerBtn.forEach((element) => {
      element.classList.remove('button-active');
      element.classList.add('button-inactive');
    });
  }
  toggleToRegister() {
    console.log('Reg In Toggle');

    const signInBtn = document.querySelectorAll('.sliderL');
    const registerBtn = document.querySelectorAll('.sliderR');
    console.log(signInBtn);

    this.isSignInActive = false;
    signInBtn.forEach((element) => {
      element.classList.remove('button-active');
      element.classList.add('button-inactive');
    });
    registerBtn.forEach((element) => {
      element.classList.remove('button-inactive');
      element.classList.add('button-active');
    });
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
  backToRegForm() {
    const otpForm = document.querySelector('.otpForm') as HTMLElement;
    const regForm = document.querySelector('.regForm') as HTMLElement;
    const socialAuth = document.querySelector('.social-auth') as HTMLElement;
    regForm!.style.display = 'block';
    socialAuth!.style.display = 'block';
    otpForm!.style.display = 'none';
  }
}
