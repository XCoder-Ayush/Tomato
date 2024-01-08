import { Category } from "./category.model";

export class Food {
    id!: string;
    price!: number;
    name!: string;
    categories!: Category[];
    imageUrl!: string;
    cookTime!: number;
    description!: string;
    stars!: number;
    onSale!:number;
    published!:number;
}
