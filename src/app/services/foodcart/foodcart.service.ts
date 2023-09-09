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
    this.initCartItems();
  }
  async initCartItems(){
    console.log("In Cart Service");
    
    await this.foodService.getAllFoodItemsSync().then((resp)=>{
      this.foodList=resp;
    })
    // console.log(this.foodList);
    for(let food of this.foodList){
      let cartItem : CartItem=new CartItem(food);
      this.cartItemList.push(cartItem);
    }
    // console.log(this.cartItemList);
  }

  setCartItems(cartItems : CartItem[]){
    this.cartItemList=cartItems;
    // console.log('NEW CART ' + this.cartItemList);
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
