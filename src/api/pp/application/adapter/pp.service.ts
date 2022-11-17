import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PublicPost } from '@PP/domain';
import { IPPService } from '../port/pp.service.port';
import { PPEntity } from '@PP/infrastructure/pp.entity';
import { HttpExceptionFactory } from '@COMMON/exception';
import { Crypto } from '@CRYPTO/domain';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PPService implements IPPService {
  constructor(
    @InjectRepository(PPEntity)
    private readonly repository: Repository<PPEntity>,
  ) {}

  async findOne({ id }: IPPService.FindOne): Promise<PublicPost.State> {
    const post = await this.repository.findOne({ where: { id } });
    if (post == null) {
      throw HttpExceptionFactory('NotFound');
    }
    return post;
  }

  async checkPassword({
    password,
    hashed,
  }: IPPService.CheckPassword): Promise<void> {
    if (!(await Crypto.compare(password, hashed))) {
      throw HttpExceptionFactory('Forbidden', '비밀번호가 일치하지 않습니다.');
    }
    return;
  }
}
