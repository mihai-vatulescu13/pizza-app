import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [
    {
      name: 'pizza',
      description: 'asdsd',
      imagePath:
        'https://savoriurbane.com/wp-content/uploads/2016/02/cea-mai-buna-reteta-de-pizza-de-casa-cu-mozzarella-rosii-busuioc.jpg',
    },
    {
      name: 'pizza cu ceapa',
      description: 'asdsd',
      imagePath:
        'https://pofta-buna.com/wp-content/uploads/2021/02/Pizza-cu-de-toate-si-blat-pufos-reteta-romaneasca-8.jpg',
    },
    {
      name: 'pizza italiana',
      description: 'asdsd',
      imagePath:
        'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/36DFE80A-776A-49F7-B4BB-273C0A702BEE/Derivates/b6c3bc06-581e-4da9-a38f-8b6d47d62891.jpg',
    },
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(item: Recipe) {
    this.recipeWasSelected.emit(item);
  }
}
