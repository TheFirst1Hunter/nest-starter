import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDTO, LoginDTO } from './dto';

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
