import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceHolderDirective } from '../shared/directives/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  public isLoginMode: boolean = true;
  public isLoading: boolean = false;
  public error: string | null = '';
  private onDestroySubscription: Subscription;

  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onHandleError() {
    this.error = null;
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
      () => {
        this.isLoading = false;

        this.router.navigate(['/recipes']);
        this.error = '';
      },
      (errorMessage) => {
        this.isLoading = false;

        this.showErrorAlert(errorMessage);
        this.error = errorMessage;
        console.log('err:', errorMessage);
      }
    );

    form.reset();
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    let hostViewContainerRef: any;
    hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    //set the component input:
    componentRef.instance.message = message;

    this.onDestroySubscription = componentRef.instance.close.subscribe(() => {
      this.onDestroySubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.onDestroySubscription) {
      this.onDestroySubscription.unsubscribe();
    }
  }
}
