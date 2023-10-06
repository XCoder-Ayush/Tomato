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
  constructor(private apiService : ApiService) { }

  // async getAllFoodItemsSync(){
  // }

  async getFoodItems(){
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
