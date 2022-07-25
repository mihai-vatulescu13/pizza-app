import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // if we have a route with id below dont use the first route without a name
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    //lazy loading(import automatically AuthModule):
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'private',
    loadChildren: () =>
      import('./pages/private-pages/private-pages.module').then(
        (module) => module.PrivatePagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
