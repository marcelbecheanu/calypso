import { Injectable, NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { CreateGroupDto } from '../dtos/create-group.dto';
import type { UpdateGroupDto } from '../dtos/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({});
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.groupRepository.update(id, updateGroupDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }

  async findRolesOfGroup(groupId: number): Promise<Group[]> {
    return await this.groupRepository.find({ where: { id: groupId }, relations: ['roles'] });
  }

  async addRole(groupId: number, roleId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Role not found');
    group.roles = [...group.roles, role];
    return this.groupRepository.save(group);
  }

  async removeRole(groupId: number, roleId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    group.roles = group.roles.filter((role) => role.id !== roleId);
    return this.groupRepository.save(group);
  }
}
