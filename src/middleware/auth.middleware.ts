import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  async use(req, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
      throw new UnauthorizedException('Unauthorized. Please provide a valid token.');
    }

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized. Invalid token.');
    }
  }
}
