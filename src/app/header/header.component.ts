import { Component, ElementRef, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutdialogComponent } from './logoutdialog/logoutdialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;
  isActive = false;
  isMobile = false;
  loggedIn = false;
  loggedInUser = '';

  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
    this.addRequiredClass();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.addRequiredClass();
  }

  async isLoggedIn() {
    this.loggedIn = this.loginService.isLoggedin();
    await this.loginService.getCurrentUserName().then((resp) => {
      this.loggedInUser = resp;
    }).catch((err) => {
      console.log(err);
    });
    console.log(this.loggedInUser);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LogoutdialogComponent, {
      width: '400px',
      height: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  addRequiredClass() {
    this.isMobile = window.innerWidth < 860;
    // if (window.innerWidth < 860) {
    //   console.log('In Less');
    //   const navWrapper = document.querySelector('.nav-wrapper') as HTMLElement;
    //   this.renderer.addClass(navWrapper, 'mobile');
    // } else {
    //   console.log('In More');
    //   const navWrapper = document.querySelector('.nav-wrapper') as HTMLElement;
    //   this.renderer.removeClass(navWrapper, 'mobile');
    // }
  }

  toggleMobileNav() {
    console.log("lll");
    this.isActive = !this.isActive;
  
    const mobileNav = document.querySelector('.nav-list') as HTMLElement;
    const bars = document.querySelectorAll('.hamburger span');
  
    mobileNav.classList.toggle('open');
  
    if (this.isActive) {
      // bars[0].classList.add('active-hamburger1');
      // bars[2].classList.add('active-hamburger2');
      // (bars[1] as HTMLElement).style.display="none";
      this.renderer.setStyle(bars[0], 'transform', 'rotate(45deg)');
      this.renderer.setStyle(bars[0],'translatex','18px')
      this.renderer.setStyle(bars[0], 'color', 'white');
      this.renderer.setStyle(bars[1], 'opacity', '0');
      this.renderer.setStyle(bars[2], 'transform', 'rotate(-45deg)');
      this.renderer.setStyle(bars[0],'translatey','-18px')
      this.renderer.setStyle(bars[2], 'color', 'white');
    } else {
      this.renderer.setStyle(bars[0], 'transform', 'rotate(0deg)');
      this.renderer.setStyle(bars[0], 'color', 'black');
      this.renderer.setStyle(bars[1], 'opacity', '1');
      this.renderer.setStyle(bars[2], 'transform', 'rotate(0deg)');
      this.renderer.setStyle(bars[0], 'color', 'black');
    }
  }  
}