import { Injectable, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models/Tag';
import { FoodService } from '../food/food.service';
import { Food } from 'src/app/shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class TagsService implements OnInit{

  constructor(private foodService : FoodService) { }
  foodItems:Food[] = [];
  tagMap =new Map<string, number>();
  tags: Tag[]=[];
  tagNames: string[]=['All','NonVeg','Veg','South Indian','Birthday'];
  currentTag='';
  ngOnInit(): void {
    // this.getAllTags();
    this.currentTag='All';
  }

  async getAllTags(){
    // Admins will allow some mostly searched tags: eg show the mostly searched 5 tags
    // Solely on the discretionary of the admins:
    this.tags=[];
    this.tagMap.clear();
    this.foodItems=[];
    await this.foodService.getFoodItems().then((resp)=>{
      this.foodItems=resp;
    })

    console.log(this.foodItems);
    
    for(let food of this.foodItems){
      for(let tag of food.tags){

        let val= this.tagMap.get(tag.toLowerCase().replace(/\s+/g, ""));
        if(val==undefined || val==null)val=0;
        this.tagMap.set(tag.toLowerCase().replace(/\s+/g, ""), val+1);

      }
    }

    console.log(this.tagMap);

    for(let tagName of this.tagNames){
      let tag=new Tag();
      tag['name']=tagName;
      let tagCount=this.tagMap.get(tagName.toLowerCase().replace(/\s+/g, ""));
      if(tagCount==null || tagCount==undefined)tagCount=0;
      if(tagName=='All')tagCount=this.foodItems.length;

      tag['count']=tagCount;
      if(tagCount>0)this.tags.push(tag);
    }
    console.log(this.tags);
    
    return this.tags;
  }


  getFoodByTag(){

  }
}
