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

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      //assign the observable to the login email
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.register(email, password);
    }

    /*
     Set the authObservable as a generic observable and subscribe to it:
     When an observable type function is assigned to this observable variable
     its automativally gets subscribed like in the regular way of subscribing between observable and observer:
    */
    authObservable.subscribe(
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
