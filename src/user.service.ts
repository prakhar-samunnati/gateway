import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
  }

  createUser(user) {
    return this.client.send({ cmd: 'create' }, user);
  }

  findAllUsers() {
    return this.client.send({ cmd: 'findAll' }, {});
  }

  findOneUser(id: number) {
    return this.client.send({ cmd: 'findOne' }, id);
  }

  updateUser(id: number, updateUserDto) {
    return this.client.send({ cmd: 'update' }, { id, updateUserDto });
  }

  removeUser(id: number) {
    return this.client.send({ cmd: 'remove' }, id);
  }
}
