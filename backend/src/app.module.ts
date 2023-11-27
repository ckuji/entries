import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { LinkModule } from './links/link.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env', isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true, //shouldn't be used in production
        autoLoadEntities: true
      })
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    LinkModule,
    ExperienceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
