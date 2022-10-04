export interface IUserController {
  findById(id: number): Promise<unknown>;

  findMany(dto?: unknown): Promise<unknown>;
}
