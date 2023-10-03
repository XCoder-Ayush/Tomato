import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Food } from '../shared/models/food';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  constructor(private apiService : ApiService) { }
  addForm = new FormGroup({
    id: new FormControl(''),
    price: new FormControl(''),
    name: new FormControl(''),
    favourite: new FormControl(''),
    tags: new FormControl(''),
    imageUrl: new FormControl(''),
    cookingTime: new FormControl(''),
    desc: new FormControl(''),
    stars: new FormControl(''),
  });

  ngOnInit(): void {
  }
  onSubmit(){
    // console.log(this.addForm.value);
    let tags : string[] = String(this.addForm.value.tags).split(' ');
    let description : string[]=[];
    description.push(String(this.addForm.value.desc));
    let food: Food={
      id: Number(this.addForm.value.id),
      price: Number(this.addForm.value.price),
      name: String(this.addForm.value.name),
      favorite: Boolean(this.addForm.value.favourite),
      tags: tags,
      imageUrl: String(this.addForm.value.imageUrl),
      cookTime: String(this.addForm.value.cookingTime),
      origins: description,
      stars: Number(this.addForm.value.stars)
    }
    // console.log(food);
    // REST API Call(To POST)
    this.apiService.addFoodItem(food).subscribe((resp)=>{
      // console.log(resp);
    },(error)=>{
      // console.log(error);
    })
  }
}
