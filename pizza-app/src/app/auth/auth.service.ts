import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  kind?: string;
  idToken?: string;
  email?: string;
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

  constructor(private http: HttpClient) {}

  //Register method:
  public signUp(email: string, password: string) {
    //return this observable to subscribe to it when user logs in:
    return this.http
      .post<AuthResponseData>(this.URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  //the code form pipe gets redundant try to make it more generic:
  public login(email: string, password: string) {
    console.log('on login...', email, password);
    //handle login logic here...
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDUJt2-saMge64PQBqhOod2r25tlBBmJE',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
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

    return throwError(errorMessage);
  }
}
