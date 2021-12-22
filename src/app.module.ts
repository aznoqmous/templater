import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TemplateModule } from './templates/template.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/templater'),
    TemplateModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
})
export class AppModule {}
