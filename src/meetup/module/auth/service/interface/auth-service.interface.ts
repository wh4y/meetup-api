export interface IAuthService {
  signUp(options: unknown): Promise<unknown>;

  signIn(options: unknown): Promise<unknown>;
}
