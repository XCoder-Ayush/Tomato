import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';
import { FoodcartService } from '../services/foodcart/foodcart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, OnChanges {
  foods: Food[] = [];
  cartItems: CartItem[] = [];
  foodsOrg: Food[] = [];
  cartItemsOrg: CartItem[] = [];

  key: string = '';

  constructor(
    private cartService: FoodcartService,
  ) {
    console.log('Constructor Of Shop Component');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Listens To Any Input Property Change decorated with @Input
    console.log('ngOnChanges ' + changes);
  }

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit');

    (()=>{
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
    })()

    // await this.initFoodItems();

    // to get updated cart details of the particular user who is logged in
    //from db or session
    this.cartItems = await this.cartService.getCartItems();
    this.cartItemsOrg=this.cartItems;

  }


  getClickedCardData(food: any) {
    // console.log(food);
  }

  incClickedCardCount(cartItem: CartItem) {
    // console.log("Increase...");
    // this.fireSnackBarAdd();
    new Noty({
      layout: 'topRight',
      type: 'success',
      text: 'Item Added To Cart',
      theme: 'metroui',
      timeout: 3000,
    }).show();

    cartItem.quantity+=1;
    // console.log(this.cartItems);
    this.setCart();
  }

  decClickedCardCount(cartItem: CartItem) {
    if(cartItem.quantity==0)return;
    // console.log("Decrease...");
    // this.fireSnackBarRem();
    new Noty({
      layout: 'topRight',
      type: 'warning',
      text: 'Item Removed From Cart',
      theme: 'metroui',
      timeout: 3000,
    }).show();

    cartItem.quantity-=1;
    // console.log(this.cartItems);
    this.setCart();
  }

  setCart() {
    // Need To Use Service Because Of Router Outlet
    this.cartService.setCartItems(this.cartItems);
  }

  getCartCount(food: any) {
    for (let foodCartItem of this.cartItems) {
      if (foodCartItem.food.id == food.id) {
        return foodCartItem.quantity;
      }
    }
    return 0;
  }

  filterFoodItems(searchKey: any) {
    // console.log(this.searchKey.value);
    // console.log(this.key);
    // console.log(searchKey);
    // console.log(this.foods);

    this.cartItems = this.cartItemsOrg.filter((item) => {
      return item.food.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(searchKey.toLowerCase());
    });
    this.foods = this.foodsOrg.filter((item: Food) => {
      return item.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(searchKey.toLowerCase());
    });
    // console.log(this.foods);
  }
  currentUser: string = 'Dead';
  // getCurrentUser(){
  //   this.apiService.getCurrentUser().subscribe((resp)=>{
  //     this.currentUser=resp;
  //   },err=>{
  //     console.log(err);
  //   })
  // }
}
