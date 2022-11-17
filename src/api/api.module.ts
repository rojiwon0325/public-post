import { Module } from '@nestjs/common';
import { PPModule } from '@PP/pp.module';

@Module({
  imports: [PPModule],
})
export class ApiModule {}
