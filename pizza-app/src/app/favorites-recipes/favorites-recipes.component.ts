import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-favorites-recipes',
  templateUrl: './favorites-recipes.component.html',
  styleUrls: ['./favorites-recipes.component.scss'],
})
export class FavoritesRecipesComponent implements OnInit, OnDestroy {
  public _favoriteRecipes: Recipe[] = [];
  private onDestroy$ = new Subject();

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.dataStorageService
      .getFavoritesRecipes()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((favRecipes: Recipe[]) => {
        console.log('fav recipes:', favRecipes);
        this._favoriteRecipes = favRecipes;
      });
  }

  public get favoriteRecipes() {
    console.log('fav recipes:', this._favoriteRecipes);
    return this._favoriteRecipes;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
