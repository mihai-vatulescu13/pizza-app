import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesList$.subscribe((data) => {
      this.recipes = data;
      console.log(data);
    });
  }

  public toggleShopAddRecipe(): void {
    // this.showAddRecipeForm = !this.showAddRecipeForm;
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public setToBeAddedRecipe(event: any): void {
    console.log('new item to be added...', event);
  }
}
