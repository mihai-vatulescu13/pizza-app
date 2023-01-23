import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingEditModule } from './shopping-edit/shopping-edit.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [CommonModule, ShoppingEditModule],
  exports: [ShoppingListComponent],
})
export class ShoppingListModule {}
