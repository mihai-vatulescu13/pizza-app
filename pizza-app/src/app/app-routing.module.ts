import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AddRecipeComponent } from './recipes/recipe-list/components/add-recipe/add-recipe.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { DataResolverService } from './shared/services/data-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '', //default
        component: RecipeStartComponent,
      }, //child route
      { path: 'new', component: AddRecipeComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [DataResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [DataResolverService],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
