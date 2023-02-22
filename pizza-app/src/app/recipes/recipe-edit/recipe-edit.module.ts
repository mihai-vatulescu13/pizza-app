import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit.component';

@NgModule({
  declarations: [RecipeEditComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RecipeEditComponent],
})
export class RecipeEditModule {}
