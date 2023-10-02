import { Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutdialogComponent } from './logoutdialog/logoutdialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;
  constructor(private loginService : LoginService,private dialog : MatDialog, private renderer : Renderer2) { 
  }
  loggedIn=false;
  ngOnInit(): void {
    this.isLoggedIn();
    this.scroll();
  }
  ngAgferViewInit():void{
    this.scroll();
  }
  isLoggedIn(){
    this.loggedIn=this.loginService.isLoggedin();
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LogoutdialogComponent, {
      width: '400px',
      height: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  scroll = window.onscroll=()=>{
      // Access the DOM element using this.navbar.nativeElement
  const navbarElement = this.navbar.nativeElement;
  const sticky=navbarElement.offsetTop;

  // Use Renderer2 to add a class to the element
    if (window.scrollY >= sticky) {
      this.renderer.addClass(navbarElement, 'sticky');
    } else {
      this.renderer.removeClass(navbarElement, 'sticky');
    }
  }

}
