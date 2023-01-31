import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public ingredientsChange = new EventEmitter();

  private ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 3,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ];

  constructor() {}

  public getIngredients() {
    return this.ingredients.slice();
  }

  public addIngredient(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientsChange.emit(this.ingredients.slice());
  }

  public addProductIngredients(newIngredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...newIngredients];
    this.ingredientsChange.emit(this.ingredients.slice());
  }
}
