import { Ingredient } from 'src/app/shopping-list/ingredient.model';

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients?: Ingredient[];
  userId?: string | null | undefined;
}

export enum AddRemoveRecipeText {
  NewRecipe = ' + New Recipe',
  Close = 'Close',
}
