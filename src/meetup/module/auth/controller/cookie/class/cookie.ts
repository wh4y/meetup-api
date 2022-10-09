export class Cookie<T> {
  constructor(
    public readonly name: string,
    public readonly val: T,
    public readonly options,
  ) {
  }
}
