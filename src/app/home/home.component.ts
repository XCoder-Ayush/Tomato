import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const blurDivs = document.querySelectorAll('.blur-load');
    blurDivs.forEach((div) => {
      const img = div.querySelector('img');
      function loaded() {
        div.classList.add('loaded');
      }
      if (img?.complete) {
        loaded();
      } else {
        img?.addEventListener('load', loaded);
      }
    });
  }

}
