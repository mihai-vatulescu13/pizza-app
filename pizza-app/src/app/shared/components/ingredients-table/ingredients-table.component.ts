import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss'],
})
export class IngredientsTableComponent {
  @Input() recipeIngredients: Ingredient[];
}
