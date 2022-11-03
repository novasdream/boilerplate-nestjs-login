import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpCode,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { UserRegisterDTO } from './dto/user-register.dto';
import { UsersService } from './users/users.service';

@Controller('auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post('register')
  register(@Request() req, @Body() payload: UserRegisterDTO) {
    this.usersService.register(payload.email, payload.name, payload.surname);
    return req.user;
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
