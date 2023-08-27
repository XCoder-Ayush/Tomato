import { Injectable, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Food } from 'src/app/shared/models/food';
import { FoodService } from '../food/food.service';

@Injectable({
  providedIn: 'root'
})
export class FoodcartService implements OnInit{

  cartItemList : CartItem[]=[];
  foodList:Food[]=[];

  constructor(private foodService : FoodService){}

  ngOnInit(): void{
    // this.foodList=this.foodService.getAllFoodItems();
    this.initCartItems();
  }
  // getAllItems() : CartItem[]{
  //   return this.cartItemList;
  //   // Returns Empty Cart:
  // }
  initCartItems(){
    this.foodList=this.foodService.getAllFoodItems();
    // console.log(this.foodList);
    
    for(let food of this.foodList){
      let cartItem : CartItem=new CartItem(food);
      this.cartItemList.push(cartItem);
    }
    // console.log(this.cartItemList);
  }
  setCartItems(cartItems : CartItem[]){
    this.cartItemList=cartItems;
    console.log(this.cartItemList);
    
  }  
  getCartItems(){
    if(this.cartItemList.length==0)this.initCartItems();
    return this.cartItemList;
  }
  clearCartItems(){
    this.cartItemList=[];
    this.initCartItems();
  }

}
