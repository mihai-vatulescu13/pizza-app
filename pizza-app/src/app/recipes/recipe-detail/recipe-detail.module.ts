import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [CommonModule],
  exports: [RecipeDetailComponent],
})
export class RecipeDetailModule {}
