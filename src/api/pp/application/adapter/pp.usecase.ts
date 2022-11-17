import { Crypto } from '@CRYPTO/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicPost } from '@PP/domain';
import { PPEntity } from '@PP/infrastructure/pp.entity';
import { Repository } from 'typeorm';
import { IPPService } from '../port/pp.service.port';
import { IPPUsecase } from '../port/pp.usecase.port';

@Injectable()
export class PPUsecase implements IPPUsecase {
  constructor(
    private readonly service: IPPService,
    @InjectRepository(PPEntity)
    private readonly repository: Repository<PPEntity>,
  ) {}

  async create({
    password,
    title,
    contents,
  }: IPPUsecase.Create): Promise<PublicPost.Public> {
    const hashed = await Crypto.encrypt(password);
    const entity = new PPEntity();
    entity.title = title;
    entity.contents = contents;
    entity.password = hashed;
    return PublicPost.getPublic(await this.repository.save(entity));
  }

  async findMany({
    page = 1,
  }: IPPUsecase.FindMany): Promise<PublicPost.Public[]> {
    return (
      await this.repository.find({
        order: { created_at: 'DESC' },
        take: 20,
        skip: (page - 1) * 20,
      })
    ).map(PublicPost.getPublic);
  }

  async update(
    { id, password }: Pick<PublicPost.State, 'password' | 'id'>,
    { title, contents }: IPPUsecase.Update,
  ): Promise<void> {
    const post = await this.service.findOne({ id });
    await this.service.checkPassword({ password, hashed: post.password });
    await this.repository.update(
      { id },
      {
        ...(title ? { title } : {}),
        ...(contents ? { contents } : {}),
      },
    );
    return;
  }

  async remove({
    id,
    password,
  }: Pick<PublicPost.State, 'password' | 'id'>): Promise<void> {
    const post = await this.service.findOne({ id });
    await this.service.checkPassword({ password, hashed: post.password });
    await this.repository.delete(id);
    return;
  }
}
