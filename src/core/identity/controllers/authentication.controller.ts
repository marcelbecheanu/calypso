import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { DeviceInfo } from '../decorators/device';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('check-available-email/:email')
  CheckIfEmailIsAvailable(@Param('email') email: string) {
    return this.authenticationService.checkIfEmailIsAvailable(email);
  }

  @Get('device')
  getUserInfo(@DeviceInfo() deviceInfo: any) {
    return { deviceInfo };
  }
}
