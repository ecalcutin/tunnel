import { AccountQuery } from 'features/account/domain/queries';

export class QueryAccountDto implements AccountQuery {
  public email?: string;
}
