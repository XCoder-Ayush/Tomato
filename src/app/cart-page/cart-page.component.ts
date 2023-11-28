import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/CartItem';
import { FoodcartService } from '../services/foodcart/foodcart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  
  constructor(private foodCartService : FoodcartService,private dialog: MatDialog) {
  }
  cart : CartItem[] =[];
  cartOrg : CartItem[] =[];

  totalPrice: number = 0;
  totalProducts: number = 0;

  ngOnInit(): void {
    this.initCart();
  }
  initCart(){
    this.totalPrice=0;
    this.totalProducts=0;
    // this.cart=this.foodCartService.getUpdatedCart();

  }

  async initCartItems(){
    // console.log("In Cart-Page Component Cart Items...");
    // await this.foodCartService.getCartItemsSync().then(resp=>{
    //   this.cart=resp;
    //   this.cartOrg=this.cart;
    // });
  }


  setCart() {
    //To set in cart service
    this.foodCartService.setCartItems(this.cart)
  }
  
  getTotalPrice(){
    this.totalPrice=0;
    // this.cart=this.foodCartService.getUpdatedCart();
    for(let cartItem of this.cart){
      if(cartItem.quantity>0){
        this.totalPrice+=cartItem.quantity*cartItem.food.price;
      }
    }
    return this.totalPrice;
  }

  clearCart(){
    this.foodCartService.clearCartItems();
    this.initCartItems();
  }
  
  getTotalProducts(){
    // this.cart=this.foodCartService.getUpdatedCart();
    this.totalProducts=0;

    for(let cartItem of this.cart){
      if(cartItem.quantity>0){
        this.totalProducts+=1;
      }
    }
    return this.totalProducts;
  }

  increaseCount(selectedItem : CartItem){
    // this.initCart();
    // this.cart=this.foodCartService.getUpdatedCart();

    for(let cartItem of this.cart){
      if(cartItem.food.id==selectedItem.food.id){
        cartItem.quantity+=1;
      }
    }
    this.setCart();
  }

  decreaseCount(selectedItem: CartItem){
    // this.cart=this.foodCartService.getUpdatedCart();

    for(let cartItem of this.cart){
      if(cartItem.food.id==selectedItem.food.id){
        cartItem.quantity-=1;
      }
    }
    this.setCart();
  }

  getItemCount(selectedItem : CartItem){
    // this.cart=this.foodCartService.getUpdatedCart();

    for(let cartItem of this.cart){
      if(cartItem.food.id==selectedItem.food.id){
        return cartItem.quantity;
      }
    } 
    return 0;
  }

  isCartFilled(){
    return (this.getTotalProducts()>0);    
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CheckoutComponent, {
      width: '100vw',
      height: '85vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
