import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeItemModule } from './recipe-item/recipe-item.module';
import { RecipeListComponent } from './recipe-list.component';

@NgModule({
  declarations: [RecipeListComponent],
  imports: [CommonModule, RecipeItemModule],
  exports: [RecipeListComponent],
})
export class RecipeListModule {}
