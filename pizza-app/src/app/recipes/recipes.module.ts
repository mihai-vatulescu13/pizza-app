import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeDetailModule } from './recipe-detail/recipe-detail.module';
import { RecipeListModule } from './recipe-list/recipe-list.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, RecipeListModule, RecipeDetailModule],
  exports: [RecipesComponent],
})
export class RecipesModule {}
