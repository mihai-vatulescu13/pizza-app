import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

//add here modules that will be exported
const modules = [
  ReactiveFormsModule,
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class SharedModule {}
