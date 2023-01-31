import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe-list/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  public isOpenMenu: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  public onSwitchMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  public onAddIngredients(ingredients: Ingredient[] | undefined): void {
    if (ingredients) {
      this.recipeService.addRecipeIngredients(ingredients);
    }
  }
}
