import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Input } from '@angular/core';
import { FoodcartService } from '../services/foodcart/foodcart.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  constructor(private foodCartService : FoodcartService) {
  }
  cart : CartItem[] =[];
  totalPrice: number = 0;
  totalProducts: number = 0;
  panelOpenState=false;
  ngOnInit(): void {
    this.initCart();
  }
  initCart(){
    this.totalPrice=0;
    this.totalProducts=0;
    this.cart=this.foodCartService.getCartItems();
    console.log(this.cart);
  }

  setCart() {
    this.foodCartService.setCartItems(this.cart)
  }
  
  getTotalPrice(){
    this.initCart();
    for(let cartItem of this.cart){
      if(cartItem.quantity>0){
        this.totalPrice+=cartItem.quantity*cartItem.food.price;
      }
    }
    return this.totalPrice;
  }
  clearCart(){
    this.foodCartService.clearCartItems();
    this.initCart();
  }
  getTotalProducts(){
    this.initCart();
    for(let cartItem of this.cart){
      if(cartItem.quantity>0){
        this.totalProducts+=1;
      }
    }
    return this.totalProducts;
  }
  removeFromCart(removeItem: CartItem) {
    for(let cartItem of this.cart){
      if(cartItem.food.id==removeItem.food.id){
        cartItem.quantity=0;
      }
    }
    this.setCart();
    this.initCart();
  }

  increaseCount(selectedItem : CartItem){
    for(let cartItem of this.cart){
      if(cartItem.food.id==selectedItem.food.id){
        cartItem.quantity+=1;
      }
    }
    this.setCart();
    this.initCart();

  }
  decreaseCount(selectedItem: CartItem){
    for(let cartItem of this.cart){
      if(cartItem.food.id==selectedItem.food.id){
        cartItem.quantity-=1;
      }
    }
    this.setCart();
    this.initCart();
  }

  getItemCount(selectedItem : CartItem){
    for(let cartItem of this.cart){
      if(cartItem.food.id==selectedItem.food.id){
        return cartItem.quantity;
      }
    } 
    return 0;
  }
}
