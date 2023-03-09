import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind?: string;
  idToken?: string;
  email?: string | null;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDUJt2-saMge64PQBqhOod2r25tlBBmJE';

  //store here the user:
  public user$ = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  //Register method:
  public register(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          const { email, localId, idToken, expiresIn } = responseData;

          this.handleUserAuthentication(email, localId, idToken, expiresIn);
        })
      );
  }

  public login(email: string, password: string) {
    //return an observable and does nothing until subscribing to it:
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDUJt2-saMge64PQBqhOod2r25tlBBmJE',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          const { email, localId, idToken, expiresIn } = responseData;

          this.handleUserAuthentication(email, localId, idToken, expiresIn);
        })
      );
  }

  public autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(<string>localStorage.getItem('userData'));

    if (!userData) {
      //the user is nt stored in the local storage:
      return;
    }

    //get the user form localstorage:
    const { email, id, _token, _tokenExpirationDate } = userData;

    //create new instance for the user with the CURRENT expiration token:
    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user$.next(loadedUser);
      const expirationDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();

      //check if the user login time has expired:
      this.autoLogOut(expirationDuration);
    }
  }

  public logout() {
    this.user$.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);

    //if the token is not expired yet, delete that time expiration:
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  public autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    //to simulate set time to 2000
  }

  private handleUserAuthentication(
    email: string | null | undefined,
    userId: string | null | undefined,
    token: string | null | undefined,
    expiresIn: any
  ): void {
    let expirationDate;

    if (expiresIn) {
      expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    }

    const userCreated = new User(email, userId, token, expirationDate);
    this.user$.next(userCreated);

    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(userCreated));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    console.log(errorResponse);

    //show incorrect data: good approach:
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    if (errorResponse.error.error.message === 'EMAIL_EXISTS') {
      errorMessage = 'Email already exists';
    }

    if (errorResponse.error.error.message === 'EMAIL_NOT_FOUND') {
      errorMessage = 'Email not found';
    }

    if (errorResponse.error.error.message === 'INVALID_PASSWORD') {
      errorMessage = 'Password is not correct';
    }

    return throwError(errorMessage);
  }
}
