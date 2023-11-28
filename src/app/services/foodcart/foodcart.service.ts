import { Injectable, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Food } from 'src/app/shared/models/food';
import { FoodService } from '../food/food.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodcartService{

  cartItemList : CartItem[]=[];
  foodList:Food[]=[];

  constructor(private foodService : FoodService){
    console.log("Initializing Cart Service");
  }

  async getFoodItems() {
    
    // Get From DB Depending On User:
    console.log('In Cart Service, Getting Food Items But From Food Service');
    
    this.foodList=await this.foodService.getFoodItems()
    this.foodList.forEach((food)=>{
      this.cartItemList.push(new CartItem(food))
    })
    return this.cartItemList;    
  }
  
  async getCartItems(){
    if(this.cartItemList.length==0){
      // Get Items From DB   
      console.log('Food Items Not Fetched Yet But Cart Req');
      this.cartItemList=await this.getFoodItems();
    }
    return this.cartItemList;
  }

  setCartItems(cartItems : CartItem[]){
    console.log('Setting Cart For The First Time Load Of Application');

    this.cartItemList=cartItems

    console.log(this.cartItemList);
  }  
  
  clearCartItems(){
    console.log('Clearing Cart Means Setting Quantity To 0 Not Deleting');

    this.cartItemList.forEach((cartItem)=>{
      cartItem.quantity=0;
    })

    console.log(this.cartItemList);    
  }
}
