import { Module } from '@nestjs/common';
import { Identity } from './identity/identity.module';

@Module({
  imports: [Identity],
  controllers: [],
  providers: [],
})
export class AppModule {}
