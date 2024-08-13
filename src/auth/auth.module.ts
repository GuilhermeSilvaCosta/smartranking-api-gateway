import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsModule } from 'src/aws/aws.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), AwsModule],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
