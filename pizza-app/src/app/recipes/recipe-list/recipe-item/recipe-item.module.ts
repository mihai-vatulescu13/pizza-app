import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeItemComponent } from './recipe-item.component';

@NgModule({
  declarations: [RecipeItemComponent],
  imports: [CommonModule],
  exports: [RecipeItemComponent],
})
export class RecipeItemModule {}
