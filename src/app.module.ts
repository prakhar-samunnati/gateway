import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommunicationService } from './communication.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, CommunicationService],
})
export class AppModule {}
