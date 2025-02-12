import { Get, Inject, Injectable } from '@nestjs/common';
import { IdentityService } from './identity.service';


@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(IdentityService)
    private readonly identityService: IdentityService,
  ) {}


  async checkIfEmailIsAvailable(email: string): Promise<{ code: string; message: string }> {
    try {
      await this.identityService.findIdentityByEmail(email);
      return {
        code: 'email_exists',
        message: 'The email address is already registered.',
      };
    } catch (error) {
      if (error.response && error.response.statusCode === 404) {
        return {
          code: 'email_available',
          message: 'The email address is available.',
        };
      }
      throw error;
    }
  }

}
