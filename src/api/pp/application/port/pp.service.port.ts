import { PublicPost } from '@PP/domain';

export namespace IPPService {
  export type FindOne = Pick<PublicPost.State, 'id'>;

  export interface CheckPassword {
    password: string;
    hashed: string;
  }
}

export interface IPPService {
  findOne: (filter: IPPService.FindOne) => Promise<PublicPost.State>;
  checkPassword: (args: IPPService.CheckPassword) => Promise<void>;
}
