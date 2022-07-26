export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  city?: string;
}

export interface ConnectedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  isLoggedIn: boolean;
}

export enum AuthStatus {
  Error = 'Wrong credentials ',
  NotFound = 'User not fond',
}
