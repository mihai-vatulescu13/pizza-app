import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe-list/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe-list/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private readonly SET_DATA_URL: string =
    'https://recipe-app-ff970-default-rtdb.firebaseio.com';

  private readonly GET_DATA_URL: string =
    'https://recipe-app-ff970-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  //save recipes:
  public saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(this.SET_DATA_URL + '/recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public saveFavoriteRecipes() {
    const favRecipes = this.recipeService.getFavoritesRecipes();

    return this.http
      .put(this.SET_DATA_URL + '/favourite-recipes.json', favRecipes)
      .subscribe(
        (response) => {
          console.log('added favorite recipes:', response);
        },
        (err) => {
          console.log('error:', err);
        }
      );
  }

  public getFavoritesRecipes() {
    return this.http.get<Recipe[]>(
      this.GET_DATA_URL + '/favourite-recipes.json?'
    );
  }

  public fetchRecipes() {
    //exaustMap() combine observables -> waits for the first observable(user$) to complete then executes the next
    return this.http.get<Recipe[]>(this.GET_DATA_URL + '/recipes.json?').pipe(
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
