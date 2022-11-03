import { Injectable } from '@nestjs/common';

import { b64_hmac_sha1 } from 'src/utils/b64_hmac_sha1';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'admin@test.com',
      name: 'admin',
      surname: 'admin',
      password: 'changeme',
      roles: ['admin'],
    },
    {
      userId: 2,
      email: 'user@test.com',
      name: 'maria',
      surname: 'teste',
      password: 'changeme',
      roles: ['user'],
    },
  ];

  async findAll() {
    return this.users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async register(email: string, name: string, surname: string) {
    const password = b64_hmac_sha1(
      'SOME_SECRET_MUST_BE_DEFINED_ON_DOTENV',
      `HASH_BASED_ON_TIME_${Date.now()}`,
    );

    this.users.push({
      userId: this.users.length + 1,
      password: password.slice(0, 6),
      name,
      surname,
      email,
      roles: ['user'],
    });
  }
}
