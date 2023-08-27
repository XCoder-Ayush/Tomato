import { Component, EventEmitter, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../shared/models/CartItem';
import { FoodcartService } from '../services/foodcart/foodcart.service';
import { Output } from '@angular/core';
import { Cart } from '../shared/models/Cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  constructor(private foodCartService : FoodcartService,private foodService: FoodService, private router: ActivatedRoute) { }
  searchKey: string = '';
  foodCartList : CartItem[]=[];
  // @Output() emitCartList =new EventEmitter<CartItem[]>();

  ngOnInit(): void {
    this.foodCartList=this.foodCartService.getCartItems();//Cart Service
    this.foods = this.foodService.getAllFoodItems();
    this.router.params.subscribe(params => {
      if (params['searchItem'])
        this.foods = this.foodService.getAllFoodItems().filter(food => food.name.toLowerCase().includes(params['searchItem'].toLowerCase()));
      else if (params['tag'])
        this.foods = this.foodService.getAllFoodByTag(params['tag']);
      else
        this.foods = this.foodService.getAllFoodItems();
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
