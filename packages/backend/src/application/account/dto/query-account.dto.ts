import { AccountQuery } from 'core/account/queries';

export class QueryAccountDto implements AccountQuery {
  public email?: string;
}
