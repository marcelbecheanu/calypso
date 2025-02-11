import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import type { CreateGroupDto } from '../dtos/create-group.dto';
import type { UpdateGroupDto } from '../dtos/update-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupService.findOne(id);
  }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.groupService.remove(id);
  }

  @Get(':id/roles')
  findRolesOfGroup(@Param('id') groupId: number) {
    return this.groupService.findRolesOfGroup(groupId);
  }

  @Post(':id/roles/:roleId')
  addRole(@Param('id') groupId: number, @Param('roleId') roleId: number) {
    return this.groupService.addRole(groupId, roleId);
  }

  @Delete(':id/roles/:roleId')
  removeRole(@Param('id') groupId: number, @Param('roleId') roleId: number) {
    return this.groupService.removeRole(groupId, roleId);
  }
}
