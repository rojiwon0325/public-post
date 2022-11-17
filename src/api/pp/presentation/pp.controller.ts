import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { IPPUsecase } from '@PP/application/port/pp.usecase.port';
import helper from 'nestia-helper';

@Controller('posts')
export class PPController {
  constructor(private readonly usecase: IPPUsecase) {}

  /**
   * 게시글 목록 조회
   * @tag PP
   * @param page 페이지 정보를 전달한다. 기본값은 1
   * @returns 게시글이 최신순으로 조회된다.
   */
  @Get()
  findMany(@Query('page') page?: string) {
    return this.usecase.findMany({ page: parseInt(page ?? '') ?? 1 });
  }

  /**
   * 게시글 생성
   * @tag PP
   * @param body 생성할 게시글 정보
   * @throw 400 부적합한 데이터를 전달한 경우
   * @returns 생성된 게시글 정보
   */
  @Post()
  create(@helper.TypedBody() body: IPPUsecase.Create) {
    const { title, contents, password } = body;
    return this.usecase.create({ title, contents, password });
  }

  /**
   *  게시물글 수정
   * @tag PP
   * @param id 변경할 게시글 id
   * @param body 비밀번호와 변경할 데이터
   * @throw 400 부적합한 데이터를 전달한 경우
   * @throw 403 비밀번호가 일치하지 않는 경우
   * @throw 404 게시글이 존재하지 않는 경우
   * @returns
   */
  @Patch(':pp_id')
  update(
    @helper.TypedParam('pp_id', 'number') id: number,
    @helper.TypedBody()
    body: IPPUsecase.UpdateBody,
  ) {
    const { password, title, contents } = body;
    return this.usecase.update({ id, password }, { title, contents });
  }

  /**
   * 게시글 삭제
   * @tag PP
   * @param id 변경할 게시글
   * @param body 게시글 비밀번호
   * @throw 403 비밀번호가 일치하지 않는 경우
   * @throw 404 게시글이 존재하지 않는 경우
   * @returns
   */
  @Delete(':pp_id')
  remove(
    @helper.TypedParam('pp_id', 'number') id: number,
    @helper.TypedBody() body: IPPUsecase.RemoveBody,
  ) {
    const { password } = body;
    return this.usecase.remove({ id, password });
  }
}
