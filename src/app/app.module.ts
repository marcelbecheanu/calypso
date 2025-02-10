import { Module } from '@nestjs/common';
import { IdentityModule } from '../core/identity/identity.module';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule, IdentityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
