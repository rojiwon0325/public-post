import { PublicPost } from '@PP/domain';

export namespace IPPService {
  export type FindOne = Pick<PublicPost.State, 'id'>;

  export interface CheckPassword {
    readonly password: string;
    readonly hashed: string;
  }
}

export interface IPPService {
  readonly findOne: (filter: IPPService.FindOne) => Promise<PublicPost.State>;
  readonly checkPassword: (args: IPPService.CheckPassword) => Promise<void>;
}
