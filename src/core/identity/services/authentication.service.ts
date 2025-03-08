import { ConflictException, Get, Inject, Injectable, Post } from '@nestjs/common';
import { IdentityService } from './identity.service';
import type { CreateAccountDto } from '../dtos/create-account.dto';
import type { Identity } from '../entities/identity.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(IdentityService)
    private readonly identityService: IdentityService,
  ) {}

  @Post()
  async createAccount(createAccount: CreateAccountDto) {
    const { email, password } = createAccount;

    // Check if email already exists
    const emailAvailability = await this.checkIfEmailIsAvailable(email);
    if (emailAvailability.code === 'email_exists') {
      throw new ConflictException(emailAvailability.message);
    }

    const identity: Identity = await this.identityService.create({
      email: email,
      password: password,
      isConfirmed: false,
    });
    
    // TODO: SEND EMAIL WITH CONFIRMATION
    

  



  }

  async checkIfEmailIsAvailable(email: string): Promise<{ code: string; message: string }> {
    const identity = await this.identityService.findIdentityByEmail(email, true);

    if (identity) {
      return {
        code: 'email_exists',
        message: 'The email address is already registered.',
      };
    }

    return {
      code: 'email_available',
      message: 'The email address is available.',
    };
  }
}
