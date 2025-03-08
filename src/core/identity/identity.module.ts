import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './entities/identity.entity';
import { Role } from './entities/role.entity';
import { Group } from './entities/group.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';
import { IdentityService } from './services/identity.service';
import { IdentityController } from './controllers/identity.controller';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { expiresIn, secret } from './constants/identity.config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: expiresIn },
    }),
    TypeOrmModule.forFeature([Role, Group, Identity]),
  ],
  controllers: [RoleController, GroupController, IdentityController, AuthenticationController],
  providers: [RoleService, GroupService, IdentityService, AuthenticationService],
  exports: [RoleService, GroupService, IdentityService, AuthenticationService],
})
export class IdentityModule {
  constructor() {}
}
