import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Recipe } from './recipe-list/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    //added by default:
    this.dataStorageService.fetchRecipes();
  }
}
