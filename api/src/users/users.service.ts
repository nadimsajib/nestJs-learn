import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, User } from 'src/typeorm';
import { Repository, DataSource } from 'typeorm';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private dataSource: DataSource
  ){}
  async onModuleInit(){
    const dbUser = await this.userRepository.findOneBy({ username: "john"});
    if(dbUser) return;
    this.dataSource.transaction(
      async(manager) => {
        const draftProfile = this.profileRepository.create({ age: 19 });
        const dbProfile = await manager.save(draftProfile);
        const draftUser = this.userRepository.create({ 
          username: 'john', 
          password: 'changeme',
          profile: dbProfile
        });
        await manager.save(draftUser);
      }
    )
    
  }
  private readonly users: User[] = [
    
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}