export abstract class RepositoryService<Data> {
  abstract update(data: Data): Promise<void>;
  abstract read(): Promise<Data>;
}
