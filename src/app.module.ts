import { Module } from '@nestjs/common';
import { IdentityModule } from './identity/identity.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "calypso",
      password: "calypso1234",
      database: "calypso",
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
    }),
    IdentityModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
