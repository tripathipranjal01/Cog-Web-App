export class User {
  constructor(
    private roles: Array<string>,
    private token: string | null,
    private expiration: Date | null
  ) {}

  get _expiration(): Date | null {
    return this.expiration;
  }

  get _token(): string | null {
    return this.token;
  }
}
