import { PPEntity } from './infrastructure/pp.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PPService } from './application/adapter/pp.service';
import { PPUsecase } from './application/adapter/pp.usecase';
import { PPController } from './presentation/pp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PPEntity])],
  providers: [PPService, PPUsecase],
  controllers: [PPController],
})
export class PPModule {}
