import { IBaseAggregate } from '@COMMON/interface';

export namespace PublicPost {
  export type Id = number;
  export interface State extends IBaseAggregate<Id> {
    /**
     * @maxLength 20
     */
    title: string;
    /**
     * @maxLength 200
     */
    contents: string;

    /**
     * 숫자를 하나 이상 포함한 6자리 이상의 문자열
     * 특수문자는 허용하지 않는다.
     * @pattern ^(?=.*\d)[A-Za-z\d]{6,}$
     */
    password: string;
  }
}

export interface PublicPost {
  getPublic: (agg: PublicPost.State) => Omit<PublicPost.State, 'password'>;
}

const PublicPost: PublicPost = {
  getPublic(agg) {
    const { id, title, contents, created_at, updated_at } = agg;
    return { id, title, contents, created_at, updated_at };
  },
};
