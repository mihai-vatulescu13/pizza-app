import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe-list/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  hasIngredients: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //this id is recognized from the router module because
      this.recipe = this.recipeService.getRecipe(this.id);
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
    //navigate back after the element deletion:
    this.router.navigate(['/recipes']);
  }

  public onNavBack(): void {
    this.router.navigate(['/recipes']);
  }
}
