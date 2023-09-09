import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Tag } from '../shared/models/Tag';
import { TagsService } from '../services/tags/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    console.log('In Tag Component');
    this.tags=[];
    this.tagsService.getAllTags().then(resp=>{
      this.tags=resp;
    });
  }
  
}
