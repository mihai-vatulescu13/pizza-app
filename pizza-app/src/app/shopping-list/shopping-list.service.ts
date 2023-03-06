import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public ingredientsChange$ = new Subject<Ingredient[]>();
  public selectedElemIndex$ = new Subject<number>();

  private ingredients: Ingredient[] = [];

  constructor() {}

  public getIngredients() {
    return this.ingredients.slice();
  }

  public addIngredient(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientsChange$.next(this.ingredients.slice());
  }

  public addProductIngredients(newIngredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...newIngredients];
    this.ingredientsChange$.next(this.ingredients.slice());
  }

  public getIngredient(index: number) {
    return this.ingredients[index];
  }

  public updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    //return a copy of the list to avoid mutate on it:
    this.ingredientsChange$.next(this.ingredients.slice());
  }

  public deleteIngredient(elemIndex: number) {
    this.ingredients = this.ingredients.filter(
      (item: Ingredient, index: number) => {
        return index !== elemIndex;
      }
    );
    this.ingredientsChange$.next(this.ingredients);
  }
}
