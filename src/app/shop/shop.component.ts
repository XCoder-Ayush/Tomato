import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';
import { FoodcartService } from '../services/foodcart/foodcart.service';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, OnChanges {
  foods: Food[] = [];
  cartItems: CartItem[] = [];
  foodsOrg: Food[] = [];
  cartItemsOrg: CartItem[] = [];
  currentUser: string = 'Dead';
  categoryList: Category[]=[];

  key: string = '';

  constructor(
    private cartService: FoodcartService,
    private categoryService : CategoryService
  ) {
    console.log('Constructor Of Shop Component');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Listens To Any Input Property Change decorated with @Input
    console.log('ngOnChanges ' + changes);
  }

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit');

    (()=>{
        const blurDivs = document.querySelectorAll('.blur-load');
        blurDivs.forEach((div) => {
          const img = div.querySelector('img');
          function loaded() {
            div.classList.add('loaded');
          }
          if (img?.complete) {
            loaded();
          } else {
            img?.addEventListener('load', loaded);
          }
        });  
    })()

    // await this.initFoodItems();

    // to get updated cart details of the particular user who is logged in
    //from db or session
    this.cartItems = await this.cartService.getCartItems();
    this.cartItemsOrg=this.cartItems;

    this.categoryList=await this.categoryService.getCategories();

  }

  incClickedCardCount(cartItem: CartItem) {
    // console.log("Increase...");
    new Noty({
      layout: 'topRight',
      type: 'success',
      text: 'Item Added To Cart',
      theme: 'metroui',
      timeout: 3000,
    }).show();

    cartItem.quantity+=1;
    this.setCart();
  }

  decClickedCardCount(cartItem: CartItem) {
    if(cartItem.quantity==0)return;
    // console.log("Decrease...");
    new Noty({
      layout: 'topRight',
      type: 'warning',
      text: 'Item Removed From Cart',
      theme: 'metroui',
      timeout: 3000,
    }).show();

    cartItem.quantity-=1;
    this.setCart();
  }

  setCart() {
    // Need To Use Service Because Of Router Outlet
    this.cartService.setCartItems(this.cartItems);
  }

  getCartCount(food: any) {
    for (let foodCartItem of this.cartItems) {
      if (foodCartItem.food.id == food.id) {
        return foodCartItem.quantity;
      }
    }
    return 0;
  }

  filterFoodItems(searchKey: any) {
    // console.log(this.searchKey.value);
    // console.log(this.key);
    // console.log(searchKey);
    // console.log(this.foods);

    this.cartItems = this.cartItemsOrg.filter((item) => {
      return item.food.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(searchKey.toLowerCase());
    });
    this.foods = this.foodsOrg.filter((item: Food) => {
      return item.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(searchKey.toLowerCase());
    });
    // console.log(this.foods);
  }

  // getCurrentUser(){
  //   this.apiService.getCurrentUser().subscribe((resp)=>{
  //     this.currentUser=resp;
  //   },err=>{
  //     console.log(err);
  //   })
  // }

  sortingInitiator(){
    const selectElement = document.querySelector('#sort-select') as HTMLSelectElement;
    const option = selectElement.options[selectElement.selectedIndex].value;
    console.log(option);
    if(option=='default')this.sortByDefault();
    else if(option=='rating')this.sortByRating();
    else if(option=='lowtohigh')this.sortByPriceLowToHigh();
    else if(option=='hightolow')this.sortByPriceHighToLow();
  }

  sortByDefault(){
    this.cartItems=this.cartItemsOrg;
  }

  sortByRating() {
    this.cartItems = this.cartItemsOrg.slice().sort((item1, item2) => {
        return item2.food.stars - item1.food.stars; 
    });
  }

  sortByPriceLowToHigh() {
      this.cartItems = this.cartItemsOrg.slice().sort((item1, item2) => {
          return item1.food.price - item2.food.price;
      });
  }

  sortByPriceHighToLow() {
      this.cartItems = this.cartItemsOrg.slice().sort((item1, item2) => {
          return item2.food.price - item1.food.price; 
      });
  }

  categoryUIChange(category: Category) {
    

    const cattag = document.querySelector(`#category-${category.id}`) as HTMLElement;
    // console.log(cattag);

    if (cattag) {
      console.log(cattag.classList);
      const hasClass = cattag.classList.contains('category-click');
      console.log(hasClass);
      if (hasClass == false) {
        cattag.classList.add('category-click')
      } else {
        cattag.classList.remove('category-click')
      }
    }
    this.showProductsByCategory();
  }

  clearAll() {
    this.cartItems = this.cartItemsOrg;
    const categoriesElement = document.getElementById('all-cat') as HTMLElement;


    const categoryChildren = categoriesElement.querySelectorAll('.category') as NodeListOf<HTMLElement>;
    const classToRemove = 'category-click';

    categoryChildren.forEach((childElement) => {
      if (childElement.classList.contains(classToRemove)) {
        childElement.classList.remove(classToRemove);
      }
    });

  }

  getCategoryCount(category: Category) {
    let count = 0;
    // console.log(this.cartItems);
    this.cartItems.forEach((item) => {
      item.food.categories.forEach((cat) => {

        if (category.name == cat.name) count++;
      })
    })
    return count;
  }

  showProductsByCategory(){
    console.log(this.cartItems);
    const categoriesElement = document.getElementById('all-cat') as HTMLElement;
    const categoryChildren = categoriesElement.querySelectorAll('.category') as NodeListOf<HTMLElement>;
    const classToFind = 'category-click';
    let activeCategories:string[] = [];
    categoryChildren.forEach((childElement) => {
     if(childElement.classList.contains(classToFind)){
       const id = (childElement.id.toString()).substring(9);
       console.log(id);
       activeCategories.push(id);
     }
    });

    this.cartItems = this.cartItemsOrg.filter((item)=>{
      let present:Boolean = false; 
      item.food.categories.forEach((category)=>{
        activeCategories.forEach((activeCategory)=>{
          if(category.id==activeCategory)present = true;
        })
      })
      return present;
    })
    console.log(this.cartItems);
  }

}
