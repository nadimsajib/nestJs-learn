import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Perk } from 'src/typeorm';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity

@Injectable()
export class PerkService {
  constructor(
    @InjectRepository(Perk)
    private perkRepository: Repository<Perk>,
  ){}

  async onModuleInit(){
    const perks = ['salary','benifits'];

    for(const description of perks){
      const dbPerk = await this.perkRepository.findOne({
        where: { description },
      })
      if(dbPerk) return;
      const perk = this.perkRepository.create({ description });

      await this.perkRepository.save(perk);
    }
  }
  
  private readonly users: Perk[] = [
    
  ];
}