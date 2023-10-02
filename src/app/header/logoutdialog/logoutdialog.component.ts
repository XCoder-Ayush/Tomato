import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-logoutdialog',
  templateUrl: './logoutdialog.component.html',
  styleUrls: ['./logoutdialog.component.css']
})
export class LogoutdialogComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.loginService.logoutUser();
  }
}
