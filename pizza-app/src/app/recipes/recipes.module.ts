import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeDetailModule } from './recipe-detail/recipe-detail.module';
import { RecipeEditModule } from './recipe-edit/recipe-edit.module';
import { RecipeListModule } from './recipe-list/recipe-list.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    RecipeListModule,
    RecipeDetailModule,
    AppRoutingModule,
    RecipeEditModule,
    RecipesRoutingModule,
  ],
  exports: [RecipesComponent],
})
export class RecipesModule {}
