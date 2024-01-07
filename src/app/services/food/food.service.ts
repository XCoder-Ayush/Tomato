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
 
    if(this.foodList.length==0){
      console.log("In Food Service First API Call");
      this.foodList = await lastValueFrom(this.apiService.getFoodItems());

      // await will not wait for the observable to stream all the data:

      // await this.apiService.getFoodItems().subscribe(foodItems=>{
      //   this.foodList=foodItems;
      // });
    }
    console.log('Fetched');
    return this.foodList;
  }

  // getFoodById(id: number): Food {
  //   return this.foodList.find(food => food.id == id)!;
  // }
  
  // getAllFoodByTag(tag: string): Food[] {
  //   return tag == 'All' ? this.foodList : this.foodList.filter(food => food.tags.includes(tag.toLowerCase().trim()));
  // }
  
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
