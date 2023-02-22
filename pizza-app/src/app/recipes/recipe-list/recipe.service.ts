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

  constructor(private shoppingListService: ShoppingListService) {}
  //Features to add:
  //use here json server on the future(instead of local mocked data):
  //Add Pdf feature to download the recipe:
  //use some local storage to save app state on refresh(with deletion after 8 hours):
  private recipes: Recipe[] = [
    {
      name: 'pizza',
      description: 'asa ceva n-ai mai vazut',
      imagePath:
        'https://savoriurbane.com/wp-content/uploads/2016/02/cea-mai-buna-reteta-de-pizza-de-casa-cu-mozzarella-rosii-busuioc.jpg',
      ingredients: [
        {
          name: 'Tomatoes',
          amount: 5,
        },
        {
          name: 'Cheese',
          amount: 6,
        },
        {
          name: 'Olives',
          amount: 10,
        },
      ],
    },
    {
      name: 'pizza cu ceapa',
      description: 'prea tare',
      imagePath:
        'https://pofta-buna.com/wp-content/uploads/2021/02/Pizza-cu-de-toate-si-blat-pufos-reteta-romaneasca-8.jpg',
      ingredients: [
        {
          name: 'Tomatoes Cherry',
          amount: 5,
        },
        {
          name: 'Cheese',
          amount: 6,
        },
        {
          name: 'Olives',
          amount: 10,
        },
        {
          name: 'Corn',
          amount: 20,
        },
      ],
    },
    {
      name: 'pizza italiana',
      description: 'unica in lume',
      imagePath:
        'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/36DFE80A-776A-49F7-B4BB-273C0A702BEE/Derivates/b6c3bc06-581e-4da9-a38f-8b6d47d62891.jpg',
      ingredients: [
        {
          name: 'Olives',
          amount: 6,
        },
        {
          name: 'Tomatoes',
          amount: 23,
        },
      ],
    },
  ];

  getRecipes() {
    return this.recipes.slice();
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
}
