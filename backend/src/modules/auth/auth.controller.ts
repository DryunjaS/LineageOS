// import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   @UseGuards(LocalAuthGuard)
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
// }
import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Response() res) {
    const { token } = await this.authService.login(req.user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
      expires: new Date(Date.now() + 3600000),
    });

    res.cookie('isAuth', 'true', {
      secure: true,
      sameSite: 'Strict',
      path: '/',
      expires: new Date(Date.now() + 3600000),
    });

    return res.status(200).json({ success: true });
  }
}
