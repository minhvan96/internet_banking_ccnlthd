import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalBankSeederService } from './external-bank-seeder.service';
import { ExternalBank } from '../../../entities/external-bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalBank])],
  providers: [ExternalBankSeederService],
  exports: [ExternalBankSeederService],
})
export class ExternalBankSeederModule {

}