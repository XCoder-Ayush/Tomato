import { Injectable, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Food } from 'src/app/shared/models/food';
import { FoodService } from '../food/food.service';

@Injectable({
  providedIn: 'root'
})
export class FoodcartService implements OnInit{

  cartItemList : CartItem[]=[];
  constructor(private foodService : FoodService){}
  foodList:Food[]=[];
  ngOnInit(): void{
    this.foodList=this.foodService.getAllFoodItems();
  }
  getAllItems() : CartItem[]{
    this.foodList=this.foodService.getAllFoodItems();
    console.log(this.foodList);
    
    for(let food of this.foodList){
      let cartItem : CartItem=new CartItem(food);
      this.cartItemList.push(cartItem);
    }
    console.log(this.cartItemList);
    
    return this.cartItemList;
  }
}
