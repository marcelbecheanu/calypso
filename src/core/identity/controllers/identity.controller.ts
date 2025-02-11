import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { CreateIdentityDto } from '../dtos/create-identity.dto';
import { UpdateIdentityDto } from '../dtos/update-identity.dto';
import { IdentityService } from '../services/identity.service';

@Controller('identities')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Get()
  async findAll() {
    return this.identityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.identityService.findOne(+id);
  }

  @Post()
  async create(@Body() createIdentityDto: CreateIdentityDto) {
    return this.identityService.create(createIdentityDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateIdentityDto: UpdateIdentityDto) {
    return this.identityService.update(+id, updateIdentityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.identityService.remove(+id);
  }

  @Get(':id/roles')
  async findRolesOfIdentity(@Param('id') id: string) {
    return this.identityService.findRolesOfIdentity(+id);
  }

  @Get(':id/groups')
  async findGroupsOfIdentity(@Param('id') id: string) {
    return this.identityService.findGroupsOfIdentity(+id);
  }

  @Post(':id/roles/:roleId')
  async addRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.identityService.addRole(+id, +roleId);
  }

  @Delete(':id/roles/:roleId')
  async removeRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.identityService.removeRole(+id, +roleId);
  }

  @Post(':id/groups/:groupId')
  async addGroup(@Param('id') id: string, @Param('groupId') groupId: string) {
    return this.identityService.addGroup(+id, +groupId);
  }

  @Delete(':id/groups/:groupId')
  async removeGroup(@Param('id') id: string, @Param('groupId') groupId: string) {
    return this.identityService.removeGroup(+id, +groupId);
  }
}
