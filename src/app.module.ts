import { Module } from '@nestjs/common';
import { Identity } from './identity/identity.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'postgres',
      host: "127.0.0.1",
      port: 5432,
      username: "calypso",
      password: "calypso",
      database: "calypso",
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    Identity
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
