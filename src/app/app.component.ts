import { Component } from '@angular/core';
import { CartItem } from './shared/models/CartItem';
import { Output,OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'foodorderapp';
  @Output() cartItemList : CartItem[] = [];
  ngOnInit():void{
    console.log(this.cartItemList);
  }
}
