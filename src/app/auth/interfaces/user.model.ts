export class User {
  constructor(
    private role: string | null,
    private token: string | null,
    private expiration: Date | null
  ) {}

  get _expiration(): Date | null {
    return this.expiration;
  }
}
