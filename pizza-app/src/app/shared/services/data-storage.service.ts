import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/recipes/recipe-list/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe-list/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  //save recipes:
  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    // console.log('reci:', recipes);
    this.http
      .put(
        'https://recipe-app-ff970-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    //exaustMap() combine observables -> waits for the first observable(user$) to complete then executes the next
    //fetch firstly ot user and then to http method observable:
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((user: any) => {
        return this.http.get<Recipe[]>(
          'https://recipe-app-ff970-default-rtdb.firebaseio.com/recipes.json?',
          {
            params: new HttpParams().set('auth', user?.token),
          }
        );
      }),
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
