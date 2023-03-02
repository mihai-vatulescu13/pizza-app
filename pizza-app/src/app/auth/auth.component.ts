import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  public isLoginMode: boolean = true;
  public isLoading: boolean = false;
  public error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      //do login stuff...
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    //set the authObs as a generic observable(handle data or error):
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;

        this.router.navigate(['/recipes']);
        this.error = '';
      },
      (errorMessage) => {
        this.isLoading = false;

        this.error = errorMessage;
        console.log('err:', errorMessage);
      }
    );

    form.reset();
  }
}
