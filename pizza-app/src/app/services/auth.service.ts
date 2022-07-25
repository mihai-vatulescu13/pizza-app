import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPageState } from '../pages/auth/auth.model';
import { AuthStatus, User } from './user-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //login is the default page:
  public authPageState: AuthPageState = AuthPageState.Login;
  private usersData: User[] = [];
  public connectedUser: User | any = {};

  constructor(private http: HttpClient, private router: Router) {}

  public setAuthPage(pageRoute: string): void {
    this.authPageState =
      pageRoute === AuthPageState.Login
        ? AuthPageState.Login
        : AuthPageState.Register;
  }

  public getUsersData(): any {
    //this method will return an observable:
    return this.http
      .get<User[]>('http://localhost:3000/users')
      .subscribe((res) => {
        this.usersData = res;
        console.log('users data array:', this.usersData);
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
      currentUser.password === formData.password
    ) {
      console.log('user connected with success!');
      //set the connected user and redirect the user to the home page:
      this.setConnectedUser(currentUser);
      this.router.navigateByUrl('private/home', { state: currentUser });
      return currentUser;
    } else {
      console.error('wrong credentials');
      return AuthStatus.Error;
    }
  }

  public setConnectedUser(userData: User): void {
    this.connectedUser = userData;
  }
}
