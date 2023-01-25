import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  isOpenMenu: boolean = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  public onSwitchMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  public onAddIngredients(ingredients: any): void {
    console.log('on add ingredients:');
    this.shoppingListService.addProductIngredients(ingredients);
  }
}
