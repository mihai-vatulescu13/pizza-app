import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe-list/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public id: number;
  public hasIngredients: boolean;
  private onDesctoy$ = new Subject();
  private _userData: User | null;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //this id is recognized from the router module because
      this.recipe = this.recipeService.getRecipe(this.id);
      console.log('selected recipe:', this.recipe);
    });

    this.authService.user$
      .pipe(takeUntil(this.onDesctoy$))
      .subscribe((userData: User | null) => {
        if (userData) {
          this._userData = userData;
        }
      });
  }

  public onAddIngredients(
    ingredients: Ingredient[] | undefined,
    event: any
  ): void {
    event.preventDefault();
    if (ingredients) {
      this.recipeService.addRecipeIngredients(ingredients);
    }
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteRecipeItem() {
    this.recipeService.deleteRecipe(this.id);
    this.dataStorageService.saveRecipes();
    this.router.navigate(['/recipes']);
  }

  public onNavBack(): void {
    this.router.navigate(['/recipes']);
  }

  onAddToFavouriteList(): void {
    const userId: string | null | undefined = this._userData?.id;

    this.recipeService.updateRecipe(this.id, {
      ...this.recipe,
      userId,
    });

    this.dataStorageService.saveRecipes();
  }

  ngOnDestroy(): void {
    this.onDesctoy$.next(true);
    this.onDesctoy$.complete();
  }
}
