import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeItemModule } from '../recipes/recipe-list/recipe-item/recipe-item.module';
import { FavoritesRecipesComponent } from './favorites-recipes.component';

@NgModule({
  declarations: [FavoritesRecipesComponent],
  imports: [CommonModule, RecipeItemModule, AppRoutingModule],
  exports: [FavoritesRecipesComponent],
})
export class FavoritesRecipesModule {}
