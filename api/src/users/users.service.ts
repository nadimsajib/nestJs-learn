import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}
  async onModuleInit(){
    const dbUser = await this.userRepository.findOneBy({ username: "john"});
    if(dbUser) return;
    const draftUser = this.userRepository.create({ username: 'john', password: 'changeme'});
    await this.userRepository.save(draftUser);
  }
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}