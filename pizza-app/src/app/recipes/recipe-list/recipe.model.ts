import { Ingredient } from 'src/app/shopping-list/ingredient.model';

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients?: Ingredient[];
}

export enum AddRemoveRecipeText {
  NewRecipe = ' + New Recipe',
  Close = 'Close',
}
