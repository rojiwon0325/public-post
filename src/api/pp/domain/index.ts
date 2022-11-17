import { IBaseAggregate } from '@COMMON/interface';

export namespace PublicPost {
  export type Id = number;
  export interface State extends IBaseAggregate<Id> {
    /**
     * @maxLength 20
     */
    readonly title: string;
    /**
     * @maxLength 200
     */
    readonly contents: string;

    /**
     * 숫자를 하나 이상 포함한 6자리 이상의 문자열
     * 특수문자는 허용하지 않는다.
     * @pattern ^(?=.*\d)[A-Za-z\d]{6,}$
     */
    readonly password: string;
  }

  export type Public = Omit<State, 'password'>;
}

export interface PublicPost {
  getPublic: (agg: PublicPost.State) => PublicPost.Public;
}

export const PublicPost: PublicPost = {
  getPublic(agg) {
    const { id, title, contents, created_at, updated_at } = agg;
    return { id, title, contents, created_at, updated_at };
  },
};
