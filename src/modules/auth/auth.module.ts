import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({  imports: [    UsersModule,    PassportModule,    ConfigModule,    JwtModule.registerAsync({      useFactory: (configService: ConfigService) => ({        secret: configService.get('JWT_SECRET') || 'wangfang',        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') || '7d' },      }),      inject: [ConfigService],    }),  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}