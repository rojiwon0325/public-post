import { PublicPost } from '@PP/domain';

export namespace IPPUsecase {
  export type Create = Pick<
    PublicPost.State,
    'title' | 'contents' | 'password'
  >;
  export interface FindMany {
    page?: number;
  }
  export type Update = Partial<Pick<PublicPost.State, 'title' | 'contents'>>;
  export type UpdateBody = Pick<PublicPost.State, 'password'> & Update;
  export type RemoveBody = Pick<PublicPost.State, 'password'>;
}

export interface IPPUsecase {
  create: (data: IPPUsecase.Create) => Promise<PublicPost.Public>;
  findMany: (filter: IPPUsecase.FindMany) => Promise<PublicPost.Public[]>;
  update: (
    filter: Pick<PublicPost.State, 'id' | 'password'>,
    update: IPPUsecase.Update,
  ) => Promise<void>;
  remove: (filter: Pick<PublicPost.State, 'id' | 'password'>) => Promise<void>;
}
