import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeComponent } from './add-recipe.component';

@NgModule({
  declarations: [AddRecipeComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddRecipeComponent],
})
export class AddRecipeModule {}
