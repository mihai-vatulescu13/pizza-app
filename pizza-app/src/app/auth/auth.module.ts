import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent],
  imports: [CommonModule, FormsModule],
  exports: [AuthComponent],
})
export class AuthModule {}
