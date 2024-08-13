import {
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRegistryUserDto } from './dtos/auth-registry.dto';
import { AwsService } from 'src/aws/aws.service';
import { AuthLoginUserDto } from './dtos/auth-login-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly awsService: AwsService) {}

  @Post('/registry')
  async registry(
    @Body() authRegistryUserDto: AuthRegistryUserDto,
  ): Promise<any> {
    this.logger.log('authRegistryUserDto', authRegistryUserDto);
    return this.awsService.registryUser(authRegistryUserDto);
  }

  @Post('/login')
  async auth(@Body() authLoginUserDto: AuthLoginUserDto): Promise<any> {
    try {
      this.logger.log('authLoginUserDto', authLoginUserDto);
      return await this.awsService.authUser(authLoginUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException(err);
    }
  }
}
