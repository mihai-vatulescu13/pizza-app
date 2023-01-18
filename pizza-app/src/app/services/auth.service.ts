import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPageState } from '../pages/auth/auth.model';
import { USERS_URL } from './URL_ROUTES';
import { AuthStatus, ConnectedUser, User } from './user-data.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //login is the default page:
  public authPageState: AuthPageState = AuthPageState.Login;
  private usersData: User[] = [];
  public connectedUser: ConnectedUser | any = {};
  //define the behaviour subject:
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  //from this public we can create any subscribe that we would like:
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('user auth');
    console.log('authentication token:', !!token);
    this._isLoggedIn$.next(!!token);
  }

  public setAuthPage(pageRoute: string): void {
    this.authPageState =
      pageRoute === AuthPageState.Login
        ? AuthPageState.Login
        : AuthPageState.Register;
  }

  public getUsersData(): any {
    //this method will return an observable:
    return this.http.get<User[]>(USERS_URL).subscribe((res) => {
      this.usersData = res;
    });
  }

  public userLogin(formData: User): User | string {
    const currentUser: any = this.usersData.find(
      (user) => user.email === formData.email
    );

    if (!currentUser) {
      console.error('user not found');
      return AuthStatus.NotFound;
    }

    if (
      currentUser.email === formData.email &&
      currentUser.password === formData.password //true here
    ) {
      //set the connected user and redirect the user to the home page:
      this.setConnectedtUser(currentUser);
      this._isLoggedIn$.next(true);

      //save user id(a token would be better) to keep them logged in:
      // console.log(this.connectedUser);
      localStorage.setItem('user auth', this.connectedUser.id);

      this.router.navigateByUrl('private/home');
      return currentUser;
    } else {
      return AuthStatus.Error;
    }
  }

  private setConnectedtUser(user: User): void {
    this.connectedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: user.city,
      isLoggedIn: true,
    };
  }

  public logOut(): void {
    this.router.navigateByUrl('auth/login');
  }
}
