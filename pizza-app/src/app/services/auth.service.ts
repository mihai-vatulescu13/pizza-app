import { Injectable } from '@angular/core';
import { AuthPageState } from '../pages/auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //login is the default page:
  public authPageState: AuthPageState = AuthPageState.Login;

  constructor() {}

  public setAuthPage(pageRoute: string): void {
    this.authPageState =
      pageRoute === AuthPageState.Login
        ? AuthPageState.Login
        : AuthPageState.Register;
  }
}
