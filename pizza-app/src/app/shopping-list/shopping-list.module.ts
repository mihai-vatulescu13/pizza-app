import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [CommonModule],
  exports: [ShoppingListComponent],
})
export class ShoppingListModule {}
