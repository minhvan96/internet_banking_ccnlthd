import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExternalBeneficiaryQuery } from './get-external-beneficiary.query';
import { ExternalBeneficiaryResponseModel } from '../response-models/external-beneficiary.response-model';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetExternalBeneficiaryQuery)
export class GetExternalBeneficiaryHandler implements IQueryHandler<GetExternalBeneficiaryQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async execute(query: GetExternalBeneficiaryQuery): Promise<ExternalBeneficiaryResponseModel[]> {
    const customerBeneficiaries = await this.userRepository.findOne({
      where: {
        id: query.userId,
        isDeleted: false
      },
      relations: {
        customerExternalBeneficiaries: {
          alias: true,
          bankAccount: {
            externalBank: true
          }
        }
      }
    });

    return customerBeneficiaries.customerExternalBeneficiaries.map(beneficiary => new ExternalBeneficiaryResponseModel(beneficiary.alias,
      beneficiary.bankAccount.accountNumber,
      beneficiary.bankAccount.externalBank.id,
      beneficiary.bankAccount.externalBank.name));
  }
}