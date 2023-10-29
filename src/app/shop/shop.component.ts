import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../shared/models/CartItem';
import { FoodcartService } from '../services/foodcart/foodcart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api/api.service';

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
    private foodCartService: FoodcartService,
    private foodService: FoodService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    console.log('Constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Listens To Any Input Property Change decorated with @Input
    console.log('ngOnChanges ' + changes);
  }

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit');
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

    await this.initFoodItems();

    // to get updated cart details of the particular user who is logged in
    //from db or session
    this.cartItems = await this.foodCartService.getUpdatedCart();
    
    let flag: boolean = false;
    for (let cartItem of this.cartItems) {
      if (cartItem.quantity > 0) {
        flag = true;
      }
    }
    // Food Items Have Surely Come:
    console.log('Aage Hoye Jawar Por' + flag);

    if (flag == false) this.initCartItems();

  }

  async initFoodItems() {
    // console.log("In shop Component Fetching Products...");
    await this.foodService.getFoodItems().then((resp) => {
      localStorage.setItem('foodItems', JSON.stringify(resp));
      this.foods = resp;
      this.foodsOrg = resp;
    });
    // console.log(this.foods);
  }

  async initCartItems() {
    // console.log("In Home Component Cart Items...");
    await this.foodCartService.getCartItemsSync().then((resp) => {
      this.cartItems = resp;
      this.cartItemsOrg = this.cartItems;
    });
    // console.log(this.cartItems);
  }

  getClickedCardData(food: any) {
    // console.log(food);
  }

  incClickedCardCount(food: any) {
    // console.log("Increase...");
    this.fireSnackBarAdd();
    for (let foodCartItem of this.cartItems) {
      if (foodCartItem.food.id == food.id) {
        foodCartItem.quantity += 1;
      }
    }
    // console.log(this.cartItems);
    this.setCart();
  }

  decClickedCardCount(food: any) {
    // console.log("Decrease...");
    this.fireSnackBarRem();
    for (let foodCartItem of this.cartItems) {
      if (foodCartItem.food.id == food.id) {
        foodCartItem.quantity -= 1;
        if (foodCartItem.quantity < 0) foodCartItem.quantity = 0;
      }
    }
    // console.log(this.cartItems);
    this.setCart();
  }

  fireSnackBarAdd() {
    this.snackBar.open('Item Added To Cart', 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  fireSnackBarRem() {
    this.snackBar.open('Item Removed From Cart', 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  setCart() {
    // Need To Use Service Because Of Router Outlet
    this.foodCartService.setCartItems(this.cartItems);
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
