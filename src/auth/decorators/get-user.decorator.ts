import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user)
      throw new InternalServerErrorException('Usuario no encontrado (request');
    return !data ? user : user[data];
  },
);

export const rawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const raw = ctx.switchToHttp().getRequest();
    if (!raw) throw new InternalServerErrorException('no hay headeres???');
    return raw.rawHeaders;
  },
);
