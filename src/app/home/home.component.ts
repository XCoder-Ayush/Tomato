import { Component, EventEmitter, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../shared/models/CartItem';
import { FoodcartService } from '../services/foodcart/foodcart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  foodCartList : CartItem[]=[];
  foodsOrg: Food[] = [];
  foodCartListOrg : CartItem[]=[];

  key : string ='';

  constructor(private foodCartService : FoodcartService,private foodService: FoodService, private router: ActivatedRoute,
    private snackBar : MatSnackBar, private apiService : ApiService) { }


  ngOnInit(): void {
    this.initFoodItems();

    this.foodCartList=this.foodCartService.getUpdatedCart();
    
    let flag:boolean=false;
    for(let cartItem of this.foodCartList){
      if(cartItem.quantity>0){
        flag=true;
      }
    }
    if(flag==false)this.initCartItems();
  }

  async initFoodItems(){
    // console.log("In Home Component Fetching Products...");
    await this.foodService.getAllFoodItemsSync().then(resp=>{
      this.foods=resp;
      this.foodsOrg=resp;
    })
    // console.log(this.foods);
    
  }
  async initCartItems(){
    // console.log("In Home Component Cart Items...");
    await this.foodCartService.getCartItemsSync().then(resp=>{
      this.foodCartList=resp;
      this.foodCartListOrg=this.foodCartList;
    });
    // console.log(this.foodCartList);
  }

  getClickedCardData(food : any){
    // console.log(food);
  }

  incClickedCardCount(food : any){
    // console.log("Increase...");
    this.fireSnackBarAdd();
    for(let foodCartItem of this.foodCartList){
      if(foodCartItem.food.id==food.id){
        foodCartItem.quantity+=1;
      }
    }
    // console.log(this.foodCartList);
    this.setCart();
  }

  decClickedCardCount(food : any){
    // console.log("Decrease...");
    this.fireSnackBarRem();
    for(let foodCartItem of this.foodCartList){
      if(foodCartItem.food.id==food.id){
        foodCartItem.quantity-=1;
        if(foodCartItem.quantity<0)foodCartItem.quantity=0;
      }
    }
    // console.log(this.foodCartList);
    this.setCart();
  }
  fireSnackBarAdd(){
    this.snackBar.open('Item Added To Cart', 'Dismiss',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
  fireSnackBarRem(){
    this.snackBar.open('Item Removed From Cart', 'Dismiss',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    
    });
  }

  setCart(){
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

  filterFoodItems(searchKey : any){    
    // console.log(this.searchKey.value);
    // console.log(this.key);
    // console.log(searchKey);
    // console.log(this.foods);
    
    this.foodCartList=this.foodCartListOrg.filter((item)=>{
      return item.food.name.toLowerCase().replace(/\s+/g, "").includes(searchKey.toLowerCase())
    })
    this.foods=this.foodsOrg.filter((item : Food)=>{
      return item.name.toLowerCase().replace(/\s+/g, "").includes(searchKey.toLowerCase())
    })
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
