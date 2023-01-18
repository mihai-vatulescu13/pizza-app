import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrivatePagesRoutingModule, HomeModule, CartModule],
})
export class PrivatePagesModule {}
