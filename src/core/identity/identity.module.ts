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

@Module({
  imports: [TypeOrmModule.forFeature([Role, Group, Identity])],
  controllers: [RoleController, GroupController, IdentityController],
  providers: [RoleService, GroupService, IdentityService],
  exports: [RoleService, GroupService],
})
export class IdentityModule {
  constructor() {}
}
