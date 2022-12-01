import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalBank } from 'src/entities/external-bank.entity';
import { externalBanks } from './external-bank-seeder.data';

@Injectable()
export class ExternalBankSeederService {
  constructor(@InjectRepository(ExternalBank)
              private readonly externalBankRepository: Repository<ExternalBank>) {
  }

  create(): Array<Promise<ExternalBank>> {
    return externalBanks.map(async (externalBank: ExternalBank) => {
      return await this.externalBankRepository
        .findOneBy({
          name: externalBank.name,
        })
        .then(async newExternalBank => {
          // We check if a externalBank already exists.
          // If it does don't create a new one.
          if (newExternalBank) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(externalBank).then(() => { ... });
            await this.externalBankRepository.save(externalBank),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}