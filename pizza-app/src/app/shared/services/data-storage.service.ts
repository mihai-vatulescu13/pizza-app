import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe-list/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe-list/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  //save recipes:
  public saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://recipe-app-ff970-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  public fetchRecipes() {
    //exaustMap() combine observables -> waits for the first observable(user$) to complete then executes the next
    //fetch firstly ot user and then to http method observable:
    return this.http
      .get<Recipe[]>(
        'https://recipe-app-ff970-default-rtdb.firebaseio.com/recipes.json?'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
