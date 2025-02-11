import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './entities/identity.entity';
import { Role } from './entities/role.entity';
import { Group } from './entities/group.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Group, Identity]),
  ],
  controllers: [RoleController, GroupController],
  providers: [RoleService, GroupService],
  exports: [RoleService, GroupService],
})
export class IdentityModule {
  constructor () {}
}