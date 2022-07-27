import { Controller, Post, Body } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignInDTO, LoginDTO } from './dto';

@ApiTags('auth')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signIn')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.userService.signIn(signInDTO);
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.userService.validateUser(loginDTO);
  }
}
