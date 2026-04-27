import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import express from 'express';

@Controller()
export class AppController {
  private readonly webUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {
    this.webUrl = this.configService.getOrThrow<string>('WEB_URL');
  }

  @Get('login')
  login(@Res() res: express.Response) {
    const authUrl = this.appService.getAuthorizationUrl();
    res.redirect(authUrl);
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: express.Response) {
    try {
      const tokenResponse = await this.appService.exchangeCodeForToken(code);

      res.cookie('access_token', tokenResponse.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });

      res.redirect(this.webUrl);
    } catch {
      throw new InternalServerErrorException('Authorization error');
    }
  }

  @Get('user-info')
  async getUserInfo(@Req() req: express.Request) {
    const token = req.cookies['access_token'] as string;

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const userInfo = await this.appService.getUserProfile(token);
      return userInfo;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
