import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CommunicationService } from './communication.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly communicationService: CommunicationService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto) {
    const user = await this.userService.createUser(createUserDto).toPromise();
    await this.communicationService
      .notify(`User created: ${user.name}`)
      .toPromise();
    return user;
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers().toPromise();
  }

  @Get(':id')
  findOneUser(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOneUser(id).toPromise();
  }

  @Put(':id')
  async updateUser(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto) {
    const user = await this.userService
      .updateUser(id, updateUserDto)
      .toPromise();
    await this.communicationService
      .notify(`User updated: ${user.name}`)
      .toPromise();
    return user;
  }

  @Delete(':id')
  async removeUser(@Param('id',ParseIntPipe) id: number) {
    console.log(typeof id);
    const result = await this.userService.removeUser(id).toPromise();
    await this.communicationService.notify(`User removed: ${id}`).toPromise();
    return result;
  }
}
