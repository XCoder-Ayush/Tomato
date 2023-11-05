import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor() {}
  totalAmount: number = 68.47;
  originalAmount: number = 68.47;
  couponCode: string = '';
  couponDiscount: number = 0;

  ngOnInit(): void {}
  validateCoupon() {
    let couponCodes: Coupon[] = [
      { code: 'FUN100', discount: 20 },
      { code: 'FIRST100', discount: 15 },
    ];
    //REST API Call

    let applyCoupon: boolean = false;

    couponCodes.forEach((coupon) => {
      if (this.couponCode === coupon.code) {
        applyCoupon = true;
        this.couponDiscount = coupon.discount;
      }
    });
    const correctBar = document.querySelector('#correct-bar') as HTMLElement;
    const errorBar = document.querySelector('#error-bar') as HTMLElement;
    const strikeThroughPrice = document.querySelector(
      '#strikethroughprice'
    ) as HTMLElement;
    const discountSpan = document.querySelector(
      '#discount-percent'
    ) as HTMLElement;
    if (applyCoupon) {
      errorBar!.style.display = 'none';
      strikeThroughPrice!.style.display = 'block';
      discountSpan!.style.display = 'inline';
      this.totalAmount = this.originalAmount;
      this.totalAmount -= (this.couponDiscount / 100) * this.originalAmount;
      this.totalAmount = +this.totalAmount.toFixed(2);
      correctBar!.style.display = 'block';
    } else {
      this.totalAmount = this.originalAmount;
      correctBar!.style.display = 'none';
      strikeThroughPrice!.style.display = 'none';
      discountSpan!.style.display = 'none';
      errorBar!.style.display = 'block';
    }
  }
}
interface Coupon {
  code: string;
  discount: number;
}
