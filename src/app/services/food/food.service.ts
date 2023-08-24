import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/Tag';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getFoodById(id: number): Food {
    return this.getAllFoodItems().find(food => food.id == id)!;
  }
  getAllFoodByTag(tag: string): Food[] {
    return tag == 'All' ? this.getAllFoodItems() : this.getAllFoodItems().filter(food => food.tags.includes(tag.toLowerCase().trim()));
  }
  getAllTag(): Tag[] {
    return [
      { name: 'All', count: 8 },
      { name: 'NonVeg', count: 2 },
      { name: 'Veg', count: 2 },
      { name: 'South Indian', count: 1 },
      { name: 'Birthday', count: 2 }
    ];
  }
  getAllFoodItems(): Food[] {
    return [
      {
        id: 1,
        price: 455,
        name: "Cake",
        favorite: false,
        tags: ["cake", "birthday", "nonveg"],
        imageUrl: "./assets/cake.jpeg",
        cookTime: "15mins",
        origins: ["Cake is a flour confection made from flour, sugar, and other ingredients, and is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate, and which share features with desserts such as pastries, meringues, custards, and pies."],
        stars: 4
      },
      {
        id: 2,
        price: 399,
        name: "Chole Bhature",
        favorite: false,
        tags: ["cholebhature", "veg"],
        imageUrl: "./assets/cholebhature.webp",
        cookTime: "15mins",
        origins: ["Chole bhature (Hindi: छोले भटूरे) is a food dish popular in the Northern areas of the Indian subcontinent. It is a combination of chana masala (spicy white chickpeas) and bhatura/puri, a fried bread made from maida. Although it is known as a typical Punjabi dish, there are varied claims around the origin of dish."],
        stars: 4
      },
      {
        id: 3,
        price: 399,
        name: "Burger",
        favorite: false,
        tags: ["burger", "nonveg", "birthday"],
        imageUrl: "./assets/burger.jpeg",
        cookTime: "15mins",
        origins: ["A hamburger (or burger for short) is a food consisting of fillings —usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll. Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or chilis; condiments such as ketchup, mustard, mayonnaise, relish, or a special sauce, often a variation of Thousand Island dressing; and are frequently placed on sesame seed buns. A hamburger topped with cheese is called a cheeseburger"],
        stars: 5
      },
      {
        id: 4,
        price: 99,
        name: "Dosa",
        favorite: false,
        tags: ["dosa", "veg", "southindian"],
        imageUrl: "./assets/dosa.png",
        cookTime: "15mins",
        origins: ["A dosa is a thin batter-based dish (usually crispy) originating from South India, made from a fermented batter predominantly consisting of lentils and rice. Its main ingredients are rice and black gram, ground together in a fine, smooth batter with a dash of salt, then fermented. Dosas are a common dish in South Indian cuisine, but now have been popular all over the Indian subcontinent. "],
        stars: 4.6
      },
      {
        id: 5,
        price: 199,
        name: "Chowmein",
        favorite: false,
        tags: ["chowmin", "veg"],
        imageUrl: "./assets/chowmin.jpeg",
        cookTime: "15mins",
        origins: ["Chow mein (/ˈtʃaʊ ˈmeɪn/ and /ˈtʃaʊ ˈmiːn/, simplified Chinese: 炒面; traditional Chinese: 炒麵; Pinyin: chǎomiàn) is a dish of Chinese stir-fried noodles with vegetables and sometimes meat or tofu. Over the centuries, variations of Chaomian were developed in many regions in China; there are several methods of frying the noodles and a range of toppings can be used.[1] It was introduced in other countries by Chinese immigrants.[1] The dish is popular throughout the Chinese diaspora and appears on the menus of most Chinese restaurants abroad."],
        stars: 4.2
      },
      {
        id: 6,
        price: 49,
        name: "Samosa",
        favorite: false,
        tags: ["samosa", "veg"],
        imageUrl: "./assets/samosa.jpeg",
        cookTime: "15mins",
        origins: ["A samosa (/səˈmoʊsə/) is a fried or baked pastry with a savory filling, including ingredients such as spiced potatoes, onions, and peas. It may take different forms, including triangular, cone, or half-moon shapes, depending on the region.[2][3][4] Samosas are often accompanied by chutney, and have origins in medieval times or earlier."],
        stars: 5
      },
      {
        id: 7,
        price: 59,
        name: "Momo",
        favorite: false,
        tags: ["momo", "veg"],
        imageUrl: "./assets/momo.jpeg",
        cookTime: "15mins",
        origins: ["iMomo are bite-size dumplings made with a spoonful of stuffing wrapped in dough. Momo are usually steamed, though they are sometimes fried or steam-fried. Meat or vegetables fillings becomes succulent as it produces an intensively flavored broth sealed inside the wrappers. Variants of the dish developed later in Nepal after it became popular among Asians.[1] Eating dumplings on the first day of the new year was a widely spread custom in northern China."],
        stars: 4.7
      },
      {
        id: 8,
        price: 399,
        name: "Sandwich",
        favorite: false,
        tags: ["sandwich", "veg"],
        imageUrl: "./assets/sandwitch.jpeg",
        cookTime: "15mins",
        origins: ["A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein bread serves as a container or wrapper for another food type.[1][2][3] The sandwich began as a portable, convenient finger food in the Western world, though over time it has become prevalent worldwide."],
        stars: 4.5
      },
    ];
  }
}
