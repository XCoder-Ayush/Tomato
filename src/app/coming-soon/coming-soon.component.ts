import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
})
export class ComingSoonComponent implements OnInit {
  constructor() {}

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
