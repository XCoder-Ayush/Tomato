import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/food';

// class CarouselController {
//   private wrapper: Element;
//   private carousel: HTMLElement;
//   private firstCardWidth: number;
//   private arrowBtns: NodeListOf<Element>;
//   private carouselChildrens: HTMLElement[];
//   private isDragging: boolean = false;
//   private isAutoPlay: boolean = true;
//   private startX: number = 0;  // Initialize startX
//   private startScrollLeft: number = 0;  // Initialize startScrollLeft
//   private timeoutId: number = 0;

//   constructor() {
//     this.wrapper = document.querySelector(".wrapper")!;
//     this.carousel = document.querySelector(".carousel")! as HTMLElement;
//     this.firstCardWidth = (this.carousel.querySelector(".card") as HTMLElement).offsetWidth;
//     this.arrowBtns = document.querySelectorAll(".wrapper i");
//     this.carouselChildrens = Array.from(this.carousel.children) as HTMLElement[];

//     // Rest of your initialization code...

//     this.setupEventListeners();
//     this.autoPlay();
//   }

//   private setupEventListeners() {
//     this.arrowBtns.forEach((btn: Element) => {
//       btn.addEventListener("click", () => {
//         this.carousel.scrollLeft += btn.id == "left" ? -this.firstCardWidth : this.firstCardWidth;
//       });
//     });

//     this.carousel.addEventListener("mousedown", this.dragStart.bind(this));
//     this.carousel.addEventListener("mousemove", this.dragging.bind(this));
//     document.addEventListener("mouseup", this.dragStop.bind(this));
//     this.carousel.addEventListener("scroll", this.infiniteScroll.bind(this));
//     this.wrapper.addEventListener("mouseenter", () => clearTimeout(this.timeoutId));
//     this.wrapper.addEventListener("mouseleave", this.autoPlay.bind(this));
//   }

//   private dragStart(e: MouseEvent) {
//     this.isDragging = true;
//     this.carousel.classList.add("dragging");
//     this.startX = e.pageX;
//     this.startScrollLeft = this.carousel.scrollLeft;
//   }

//   private dragging(e: MouseEvent) {
//     if (!this.isDragging) return;
//     this.carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
//   }

//   private dragStop() {
//     this.isDragging = false;
//     this.carousel.classList.remove("dragging");
//   }

//   private infiniteScroll() {
//     if (this.carousel.scrollLeft === 0) {
//       this.carousel.classList.add("no-transition");
//       this.carousel.scrollLeft = this.carousel.scrollWidth - (2 * this.carousel.offsetWidth);
//       this.carousel.classList.remove("no-transition");
//     } else if (Math.ceil(this.carousel.scrollLeft) === this.carousel.scrollWidth - this.carousel.offsetWidth) {
//       this.carousel.classList.add("no-transition");
//       this.carousel.scrollLeft = this.carousel.offsetWidth;
//       this.carousel.classList.remove("no-transition");
//     }

//     clearTimeout(this.timeoutId);
//     if (!this.wrapper.matches(":hover")) {
//       this.autoPlay();
//     }
//   }

//   private autoPlay() {
//     if (window.innerWidth < 800 || !this.isAutoPlay) return;

//     this.timeoutId = window.setTimeout(() => this.carousel.scrollLeft += this.firstCardWidth, 2500);
//   }
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  topDeals: Food[] = [
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
    {
      id: '10',
      price: 250,
      name: 'Egg Chicken Noodles',
      categories: [
        { id: '1', name: 'Non Veg' },
        { id: '2', name: 'Noodles' },
        { id: '3', name: 'Chinese' },
      ],
      imageUrl: '../../assets/food10.png',
      cookTime: 45,
      description:
        'A stir-fried dish combining eggs, tender chicken pieces, vegetables, and noodles, seasoned with savory sauces for a flavorful Asian-inspired meal.',
      stars: 4.2,
      onSale: 0,
      published: 1,
    },
  ];

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
  // carouselController = new CarouselController();
}
