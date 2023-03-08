import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DataResolverService } from '../shared/services/data-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AddRecipeComponent } from './recipe-list/components/add-recipe/add-recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
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
];

@NgModule({
  //use forChild as scoped module routes:
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
