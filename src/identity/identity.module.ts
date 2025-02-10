import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './entities/identity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Identity])],
  controllers: [],
  providers: [],
})
export class IdentityModule {}
