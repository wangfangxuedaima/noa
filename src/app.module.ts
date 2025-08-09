import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { FilesModule } from './modules/files/files.module';
import { PublicModule } from './modules/public/public.module';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';
import { File } from './modules/files/entities/file.entity';
import { PublicItem } from './modules/public/entities/public-item.entity';
import { initializeDatabase } from './database/seeds/init.seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'noa.db',
      entities: [User, Role, File, PublicItem],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    FilesModule,
    PublicModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await initializeDatabase(this.dataSource);
      console.log('✅ 数据库初始化完成');
    } catch (error) {
      console.error('❌ 数据库初始化失败:', error);
    }
  }
}