import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser, rawHeaders } from './decorators/get-user.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { validRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
@ApiTags('Usuarios')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // @ApiBearerAuth()
  // @Get('private')
  // @UseGuards(AuthGuard())
  // testinPrivateRoute(
  //   @GetUser() user: User,
  //   // @GetUser('id') userEmail: string,
  //   // @rawHeaders() raw: string[],
  // ) {
  //   return {
  //     ok: true,
  //     message: 'Nada pilluelo',
  //     // user,
  //     id: user.id,
  //     // raw,
  //   };
  // }

  // @ApiBearerAuth()
  // @Get('private2')
  // @RoleProtected(validRoles.user)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privateRoute2(@GetUser() user: User) {
  //   return {
  //     ok: true,
  //     user,
  //   };
  // }

  // @Get('private3')
  // @Auth(validRoles.user)
  // privateRoute3(@GetUser('id') user: User) {
  //   return {
  //     ok: true,
  //     user,
  //   };
  // }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
