import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/shared/animations/slide-in-animation';
import { AddRemoveRecipeText, Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [slideInAnimation],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  public showAddRecipeForm: boolean = false;
  public addRemoveRecipeText = AddRemoveRecipeText;
  public recipeToBeAdded: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  public toggleShopAddRecipe(): void {
    this.showAddRecipeForm = !this.showAddRecipeForm;
  }

  public setToBeAddedRecipe(event: any): void {
    console.log('new item to be added...', event);
  }
}
