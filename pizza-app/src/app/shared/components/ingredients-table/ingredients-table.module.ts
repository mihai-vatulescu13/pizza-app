import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IngredientsTableComponent } from './ingredients-table.component';

@NgModule({
  declarations: [IngredientsTableComponent],
  imports: [CommonModule],
  exports: [IngredientsTableComponent],
})
export class IngredientsTableModule {}
