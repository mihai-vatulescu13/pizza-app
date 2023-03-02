import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './header/header.module';
import { RecipeEditModule } from './recipes/recipe-edit/recipe-edit.module';
import { RecipesModule } from './recipes/recipes.module';
import { DataResolverService } from './shared/services/data-resolver.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    HeaderModule,
    BrowserAnimationsModule,
    RecipeEditModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [ShoppingListService, DataResolverService],
  bootstrap: [AppComponent],
})
export class AppModule {}
