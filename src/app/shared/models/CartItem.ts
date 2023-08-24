import { Food } from "./food";

export class CartItem {
    food: Food;
    constructor(food: Food) {
        this.food = food;
    }
    quantity: number = 0;
    getPrice(): number {
        return this.food.price * this.quantity;
    }
}