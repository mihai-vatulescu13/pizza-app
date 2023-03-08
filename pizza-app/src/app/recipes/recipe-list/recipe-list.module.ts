import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollBarDirective } from 'src/app/shared/directives/scrollbar/scroll-bar.directive';
import { SharedComponentsModule } from 'src/app/shared/sharedComponents.module';
import { AddRecipeModule } from './components/add-recipe/add-recipe.module';
import { RecipeItemModule } from './recipe-item/recipe-item.module';
import { RecipeListComponent } from './recipe-list.component';

@NgModule({
  declarations: [RecipeListComponent, ScrollBarDirective],
  imports: [
    CommonModule,
    RecipeItemModule,
    SharedComponentsModule,
    AddRecipeModule,
  ],
  exports: [RecipeListComponent],
})
export class RecipeListModule {}
