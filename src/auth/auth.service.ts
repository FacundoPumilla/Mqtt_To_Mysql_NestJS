import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { Repository, TypeORMError } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
        token: this.getJwtToken({ email: user.email, id: user.id }),
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
      token: this.getJwtToken({ email: user.email, id: user.id }),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOneById(uuid: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: { id: uuid },
      });
    } catch (error) {
      throw new TypeORMError(`Error del servicio: ${error}`);
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
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
