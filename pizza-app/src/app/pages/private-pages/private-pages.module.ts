import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PrivatePagesRoutingModule
  ]
})
export class PrivatePagesModule { }
