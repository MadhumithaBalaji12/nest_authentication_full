import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { Role } from './auth/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'M1M2M3M4M4M3M2M1',
      database: 'authorizationdb',
      entities: [User, Role],
      //synchronize:false,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
