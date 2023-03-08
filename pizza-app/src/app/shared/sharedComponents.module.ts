import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IngredientsTableModule } from './components/ingredients-table/ingredients-table.module';

@NgModule({
  imports: [CommonModule, IngredientsTableModule],
  exports: [IngredientsTableModule],
  declarations: [],
})
export class SharedComponentsModule {}
