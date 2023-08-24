import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  constructor(private foodService: FoodService, private router: ActivatedRoute) { }
  searchKey: string = '';
  ngOnInit(): void {
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



}
