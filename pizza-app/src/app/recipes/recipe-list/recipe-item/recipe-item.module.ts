import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RecipeItemComponent } from './recipe-item.component';

@NgModule({
  declarations: [RecipeItemComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [RecipeItemComponent],
})
export class RecipeItemModule {}
