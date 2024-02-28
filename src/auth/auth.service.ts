import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository, TypeORMError } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...userData } = createAuthDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginUSerDto: LoginUserDto) {
    const { password, email } = loginUSerDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales no validas (email)');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no validas (password)');
    }
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  async findOneById(uuid: string): Promise<User> {
    try {
      console.log(uuid);
      return await this.userRepository.findOne({
        where: { id: uuid },
      });
    } catch (error) {
      throw new TypeORMError(`Error del servicio: ${error}`);
    }
  }

  private handleDbErrors(error: any): never {
    if (error.errno === 1062) throw new BadRequestException(error.sqlMessage);
    console.log(error);
    throw new InternalServerErrorException('Check logs server');
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
