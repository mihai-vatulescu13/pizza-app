import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/sharedComponents.module';
import { AddRecipeModule } from './components/add-recipe/add-recipe.module';
import { RecipeItemModule } from './recipe-item/recipe-item.module';
import { RecipeListComponent } from './recipe-list.component';

@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    RecipeItemModule,
    SharedComponentsModule,
    AddRecipeModule,
  ],
  exports: [RecipeListComponent],
})
export class RecipeListModule {}
