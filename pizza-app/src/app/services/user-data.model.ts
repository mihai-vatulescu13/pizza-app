export interface Login {
  email: string;
  password: string;
}

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  city?: string;
}

export enum AuthStatus {
  Error = 'Wrong credentials ',
  NotFound = 'User not fond',
}
