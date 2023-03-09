import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipesList$ = new Subject<Recipe[]>();
  public favoritesRecipesList$ = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [];
  private favoritesRecipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getFavoritesRecipes(): Recipe[] {
    return this.favoritesRecipes.slice();
  }

  setFavoriteRecipe(item: Recipe): void {
    this.favoritesRecipes.push(item);
    this.favoritesRecipesList$.next(this.favoritesRecipes);
  }

  setRecipes(newRecipes: Recipe[]): void {
    this.recipes = newRecipes;
    this.recipesList$.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  public addRecipeIngredients(ingredients: Ingredient[]): void {
    this.shoppingListService.addProductIngredients(ingredients);
  }

  public addRecipeItem(item: Recipe) {
    this.recipes.push(item);
    this.recipesList$.next(this.recipes);
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesList$.next(this.recipes.slice());
  }

  public deleteRecipe(index: number) {
    //another way to delete an item:
    this.recipes.splice(index, 1);
    this.recipesList$.next(this.recipes);
  }
}
