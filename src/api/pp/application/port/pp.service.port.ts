import { PublicPost } from '@PP/domain';

export namespace IPPService {
  export type Create = Pick<
    PublicPost.State,
    'title' | 'contents' | 'password'
  >;
  export interface FindMany {
    page?: number;
  }
  export interface CheckPassword {
    password: string;
    hashed: string;
  }
}

export interface IPPService {
  create: (data: IPPService.Create) => Promise<PublicPost.State>;
  findMany: (filter: IPPService.FindMany) => Promise<PublicPost.Public>;
  checkPassword: (args: IPPService.CheckPassword) => Promise<void>;
}
