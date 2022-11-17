import { TypeOrmBaseEntity } from '@COMMON/base';
import { Column, Entity } from 'typeorm';

@Entity('posts')
export class PPEntity extends TypeOrmBaseEntity {
  @Column()
  title!: string;
  @Column()
  contents!: string;
  @Column()
  password!: string;
}
