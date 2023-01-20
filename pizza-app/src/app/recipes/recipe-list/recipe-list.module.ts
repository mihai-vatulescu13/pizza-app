import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecipeListModule { }
