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

  async getCartItemsSync(){

    // Get From DB Depending On User:
    
    console.log("In Cart Service");
    await this.foodService.getFoodItems().then((resp)=>{
      this.foodList=resp;
      for(let food of this.foodList){
        let cartItem : CartItem=new CartItem(food);
        this.cartItemList.push(cartItem);
      }
    })
    console.log(this.foodList);
    console.log('In Async Get Cart Item')
    console.log(this.cartItemList);
    return this.cartItemList;
  }

  setCartItems(cartItems : CartItem[]){
    console.log('Setting Cart');
    this.cartItemList=cartItems;
    console.log(this.cartItemList);
  }  
  

  clearCartItems(){
    console.log('Clearing Cart...');
    this.cartItemList=[];
    this.foodList=[]
    // this.getCartItemsSync();
  }

  getUpdatedCart(){
    console.log('Ebar Ami');
    
    return this.cartItemList;
  }
}
