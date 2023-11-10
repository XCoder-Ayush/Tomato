import { Injectable, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/Tag';
import { ApiService } from '../api/api.service';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foodList:Food[]=[]
  constructor(private apiService : ApiService) { 
    console.log("Initializing Food Service");
  }
  
  async getFoodItems(){
    // Dummy Data, Actually Obtain From REST API Call
    this.foodList=[
      {
        id:1,
        price:18.21,
        name:"Apricot Chicken",
        tags:["Burger","Non Veg"],
        imageUrl:"src/assets/food_1.png",
        cookTime:20,
        description:"Crispy bacon, tasty ham, pineapple, onion and stretchy mozzarella, finished",
        stars:4.8,
        onSale:10
      },
      {
        id:2,
        price:18.21,
        name:"Apricot Chicken",
        tags:["Burger","Non Veg"],
        imageUrl:"src/assets/food_2.png",
        cookTime:20,
        description:"Crispy bacon, tasty ham, pineapple, onion and stretchy mozzarella, finished",
        stars:4.8,
        onSale:10
      },
      {
        id:3,
        price:18.21,
        name:"Apricot Chicken",
        tags:["Burger","Non Veg"],
        imageUrl:"src/assets/food_3.png",
        cookTime:20,
        description:"Crispy bacon, tasty ham, pineapple, onion and stretchy mozzarella, finished",
        stars:4.8,
        onSale:10
      },
      {
        id:4,
        price:18.21,
        name:"Apricot Chicken",
        tags:["Burger","Non Veg"],
        imageUrl:"src/assets/food_4.png",
        cookTime:20,
        description:"Crispy bacon, tasty ham, pineapple, onion and stretchy mozzarella, finished",
        stars:4.8,
        onSale:10
      },
      {
        id:5,
        price:18.21,
        name:"Apricot Chicken",
        tags:["Burger","Non Veg"],
        imageUrl:"src/assets/food_5.png",
        cookTime:20,
        description:"Crispy bacon, tasty ham, pineapple, onion and stretchy mozzarella, finished",
        stars:4.8,
        onSale:10
      },
      {
        id:6,
        price:18.21,
        name:"Apricot Chicken",
        tags:["Burger","Non Veg"],
        imageUrl:"src/assets/food_6.png",
        cookTime:20,
        description:"Crispy bacon, tasty ham, pineapple, onion and stretchy mozzarella, finished",
        stars:4.8,
        onSale:10
      },

    ]
    if(this.foodList.length==0){
      console.log("In Food Service First API Call");
      let data = await lastValueFrom(this.apiService.getAllFoodItems());
      console.log(data);
      this.foodList=data;
      return this.foodList;  
    }
    console.log('Fetched');
    
    return this.foodList;
  }

  getFoodById(id: number): Food {
    return this.foodList.find(food => food.id == id)!;
  }
  
  getAllFoodByTag(tag: string): Food[] {
    return tag == 'All' ? this.foodList : this.foodList.filter(food => food.tags.includes(tag.toLowerCase().trim()));
  }
  
  getAllTag(): Tag[] {
    // REST API Call To Tag Service
    return [
      { name: 'All', count: 8 },
      { name: 'NonVeg', count: 2 },
      { name: 'Veg', count: 2 },
      { name: 'South Indian', count: 1 },
      { name: 'Birthday', count: 2 }
    ];
  }

}
