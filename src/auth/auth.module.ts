import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'test_secret_key',
    }),
  ],
  providers: [AuthMiddleware, UsersService],
  exports: [AuthMiddleware],
})
export class AuthModule { }
