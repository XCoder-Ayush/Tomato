import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and set a flag to determine whether to show the header and footer
        this.shouldShowHeader();
        this.shouldShowFooter();
      }
    });
  }

  shouldShowHeader() {
    const currentRoute = this.router.url;
    return currentRoute !== '/auth' ;
  }

  shouldShowFooter() {
    const currentRoute = this.router.url;
    return currentRoute !== '/auth' ;
  }
}
