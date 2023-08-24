export class Food {
    id!: number;
    price!: number;
    name!: string;
    favorite: boolean = false;
    tags!: string[];
    imageUrl!: string;
    cookTime!: string;
    origins!: string[];
    stars!: number;
}