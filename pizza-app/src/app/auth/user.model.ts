export class User {
  constructor(
    public email: string | null | undefined,
    public id: string | null | undefined,
    private _token: string | null | undefined,
    private _tokenExpirationDate: Date | null | undefined
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
