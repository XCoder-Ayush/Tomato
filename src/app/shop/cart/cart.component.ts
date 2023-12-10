import { Component, OnInit } from '@angular/core';
import { FoodcartService } from 'src/app/services/foodcart/foodcart.service';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: FoodcartService) {}

  totalAmount: number = 0;
  originalAmount: number = 0;
  couponCode: string = '';
  couponDiscount: number = 0;
  cartItemList: CartItem[] = [];
  cartItemsToDisplay: CartItem[] = [];
  
  async ngOnInit(): Promise<void> {
    this.cartItemList = await this.cartService.getCartItems();
    this.cartItemList.forEach((cartItem) => {
      if (cartItem.quantity > 0) {
        this.cartItemsToDisplay.push(cartItem);
        this.originalAmount+=cartItem.getPrice();
      }
    });
    this.totalAmount=this.originalAmount;
  }
  resetPrice(){
    this.totalAmount=0;
    this.originalAmount=0;
    this.cartItemList.forEach((cartItem) => {
      if (cartItem.quantity > 0) {
        this.originalAmount+=cartItem.getPrice();
      }
    });
    this.totalAmount=this.originalAmount;
  }

  validateCoupon() {
    //REST API Call Obtain Coupon Codes
    const couponCodes: Coupon[] = [
      { code: 'FUN100', discount: 20 },
      { code: 'FIRST100', discount: 15 },
    ];

    if(this.couponCode=='')return;

    let applyCoupon: boolean = false;

    couponCodes.forEach((coupon) => {
      if (this.couponCode === coupon.code) {
        applyCoupon = true;
        this.couponDiscount = coupon.discount;
        new Noty({
          layout: 'topRight',
          type: 'success',
          text: 'Coupon Applied',
          theme: 'metroui',
          timeout: 2500,
        }).show();
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
      this.cartService.setDiscountAmount((this.couponDiscount / 100) * this.originalAmount);
      this.totalAmount -= (this.couponDiscount / 100) * this.originalAmount;
      this.totalAmount = +this.totalAmount.toFixed(2);
      correctBar!.style.display = 'block';
    } else {
      this.cartService.setDiscountAmount(0);
      this.totalAmount = this.originalAmount;/******/
      correctBar!.style.display = 'none';
      strikeThroughPrice!.style.display = 'none';
      discountSpan!.style.display = 'none';
      errorBar!.style.display = 'block';
    }
  }

  incClickedCardCount(cartItem: CartItem) {
    new Noty({
      layout: 'topRight',
      type: 'success',
      text: 'Item Added To Cart',
      theme: 'metroui',
      timeout: 3000,
    }).show();

    cartItem.quantity += 1;
    this.setCart();
  }

  decClickedCardCount(cartItem: CartItem) {
    if(cartItem.quantity==0){
      return;
    }
    new Noty({
      layout: 'topRight',
      type: 'warning',
      text: 'Item Removed From Cart',
      theme: 'metroui',
      timeout: 3000,
    }).show();

    cartItem.quantity -= 1;
    this.setCart();
  }

  setCart() {
    this.cartItemList.forEach((cartItem) => {
      this.cartItemsToDisplay.forEach((cartItemDisplayed) => {
        if (cartItemDisplayed.food.id === cartItem.food.id) {
          cartItem.quantity = cartItemDisplayed.quantity;
        }
      });
    });

    // Maintain Cart Using Session
    this.cartService.setCartItems(this.cartItemList);
    this.resetPrice();
    this.validateCoupon();
  }
  getOriginalCost() {
    this.originalAmount = 0;
    this.cartItemsToDisplay.forEach((cartItem) => {
      this.originalAmount += cartItem.getPrice();
    });
    return this.originalAmount;
  }
  getFinalCost() {
    // this.totalAmount = this.originalAmount;
    // this.validateCoupon();
    return this.totalAmount;
  }
}

interface Coupon {
  code: string;
  discount: number;
}
