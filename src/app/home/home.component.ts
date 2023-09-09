import { Component, EventEmitter, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../shared/models/CartItem';
import { FoodcartService } from '../services/foodcart/foodcart.service';
import { Output } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  constructor(private foodCartService : FoodcartService,private foodService: FoodService, private router: ActivatedRoute) { }
  searchKey = new FormControl('');
  foodCartList : CartItem[]=[];
  key : string ='';
  ngOnInit(): void {
    this.initFoodItems();
    this.foodCartList=this.foodCartService.getCartItems();//Cart Service
  }
  async initFoodItems(){
    console.log("In Home Component");
    await this.foodService.getAllFoodItemsSync().then(resp=>{
      this.foods=resp;
    })
  }

  getClickedCardData(food : any){
    console.log(food);
  }

  incClickedCardCount(food : any){
    console.log("Increase");
    for(let foodCartItem of this.foodCartList){
      if(foodCartItem.food.id==food.id){
        foodCartItem.quantity+=1;
      }
    }
    console.log(this.foodCartList);
    this.navToCartPage();
  }

  decClickedCardCount(food : any){
    console.log("Decrease");
    for(let foodCartItem of this.foodCartList){
      if(foodCartItem.food.id==food.id){
        foodCartItem.quantity-=1;
        if(foodCartItem.quantity<0)foodCartItem.quantity=0;
      }
    }
    console.log(this.foodCartList);
    this.navToCartPage();
  }

  navToCartPage(){
    // this.emitCartList.emit(this.foodCartList);
    // Need To Use Service Because Of Router Outlet
    this.foodCartService.setCartItems(this.foodCartList);
  }

  getCartCount(food : any){
    for(let foodCartItem of this.foodCartList){
      if(foodCartItem.food.id==food.id){
        return foodCartItem.quantity;
      }
    }
    return 0;
  }
}
