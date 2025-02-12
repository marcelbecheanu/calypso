import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Identity } from '../entities/identity.entity';
import type { CreateIdentityDto } from '../dtos/create-identity.dto';
import type { UpdateIdentityDto } from '../dtos/update-identity.dto';
import { RoleService } from './role.service';
import { GroupService } from './group.service';

@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(Identity)
    private readonly identityRepository: Repository<Identity>,
    @Inject(RoleService)
    private readonly roleService: RoleService,
    @Inject(GroupService)
    private readonly groupService: GroupService,
  ) {}

  async findAll(): Promise<Identity[]> {
    return this.identityRepository.find();
  }

  async findOne(id: number): Promise<Identity> {
    const identity = await this.identityRepository.findOne({ where: { id } });
    if (!identity) {
      throw new NotFoundException(`Identity with ID ${id} not found`);
    }
    return identity;
  }

  async create(createIdentityDto: CreateIdentityDto): Promise<Identity> {
    const identity = this.identityRepository.create(createIdentityDto);
    return this.identityRepository.save(identity);
  }

  async update(id: number, updateIdentityDto: UpdateIdentityDto): Promise<Identity> {
    const identity = await this.findOne(id);
    this.identityRepository.merge(identity, updateIdentityDto);
    return this.identityRepository.save(identity);
  }

  async remove(id: number): Promise<void> {
    const identity = await this.findOne(id);
    await this.identityRepository.remove(identity);
  }

  async findRolesOfIdentity(identityId: number): Promise<Identity> {
    const identity: Identity | null = await this.identityRepository.findOne({
      where: { id: identityId },
      relations: ['roles'],
    });
    if (!identity) {
      throw new NotFoundException(`Identity with ID ${identityId} not found`);
    }
    return identity;
  }

  async findGroupsOfIdentity(identityId: number): Promise<Identity> {
    const identity: Identity | null = await this.identityRepository.findOne({
      where: { id: identityId },
      relations: ['groups'],
    });

    if (!identity) {
      throw new NotFoundException(`Identity with ID ${identityId} not found`);
    }
    return identity;
  }

  async addRole(identityId: number, roleId: number): Promise<Identity> {
    const identity = await this.findOne(identityId);
    const role = await this.roleService.findOne(roleId);
    identity.roles = [...identity.roles, role];

    return this.identityRepository.save(identity);
  }

  async removeRole(identityId: number, roleId: number): Promise<Identity> {
    const identity = await this.findOne(identityId);
    identity.roles = identity.roles.filter((role) => role.id !== roleId);
    return this.identityRepository.save(identity);
  }

  async addGroup(identityId: number, groupId: number): Promise<Identity> {
    const identity = await this.findOne(identityId);
    const group = await this.groupService.findOne(groupId);
    identity.groups = [...identity.groups, group];
    return this.identityRepository.save(identity);
  }

  async removeGroup(identityId: number, groupId: number): Promise<Identity> {
    const identity = await this.findOne(identityId);
    identity.groups = identity.groups.filter((group) => group.id !== groupId);
    return this.identityRepository.save(identity);
  }

  async findIdentityByEmail(email: string): Promise<Identity> {
    const identity: Identity | null = await this.identityRepository.findOneBy({ email });
    if (!identity) {
      throw new NotFoundException(`Identity with email ${email} not found`);
    }
    return identity;
  }
}
