import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  //Register method:
  public signUp(email: string, password: string) {
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
    console.log('user created:', userCreated);
    this.user$.next(userCreated);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    console.log(errorResponse);
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
