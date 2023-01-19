import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy';
import { AuthenticatedGuard, AnonymousGuard } from './guard';
import { SessionSerializer } from './session';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AuthenticatedGuard,
    AnonymousGuard,
    SessionSerializer,
  ],
})
export class AuthModule {}
