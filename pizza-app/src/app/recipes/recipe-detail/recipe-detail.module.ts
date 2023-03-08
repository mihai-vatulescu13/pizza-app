import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/sharedComponents.module';
import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [CommonModule, SharedComponentsModule],
  exports: [RecipeDetailComponent],
})
export class RecipeDetailModule {}
