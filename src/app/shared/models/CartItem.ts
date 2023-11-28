import { Food } from "./food";

export class CartItem {
    food: Food;
    quantity: number;
    constructor(food: Food) {
        this.food = food;
        this.quantity=0;
    }
    getPrice(): number {
        return this.food.price * this.quantity;
    }
}