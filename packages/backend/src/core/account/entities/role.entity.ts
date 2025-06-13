export class Role {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
