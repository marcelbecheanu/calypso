import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}


  @Get('check-available-email/:email')
  CheckIfEmailIsAvailable(@Param('email') email: string) {
    return this.authenticationService.checkIfEmailIsAvailable(email);
  }
}
