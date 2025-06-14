export class Role {
  public readonly id: string;
  public readonly code: string;
  public readonly description: string;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
