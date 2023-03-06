import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { AlertModule } from '../shared/components/alert/alert.module';
import { PlaceHolderDirective } from '../shared/directives/placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent, PlaceHolderDirective],
  imports: [CommonModule, FormsModule, AlertModule],
  exports: [AuthComponent],
  entryComponents: [AlertComponent],
})
export class AuthModule {}
