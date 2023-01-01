import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetInternalBeneficiaryQuery} from './get-internal-beneficiary.query';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../../../entities/identity/user.entity';
import {CustomerInternalBeneficiary} from '../../../entities/customer-internal-beneficiary.entity';

@QueryHandler(GetInternalBeneficiaryQuery)
export class GetInternalBeneficiaryHandler implements IQueryHandler<GetInternalBeneficiaryQuery>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }
  async execute(query: GetInternalBeneficiaryQuery): Promise<CustomerInternalBeneficiary[]> {
    const user = await  this.userRepository.findOne({
      where:{
        id: query.userId
      },
      relations:{
        customerInternalBeneficiaries: true
      },
      select:{
        id: false,
        customerInternalBeneficiaries:{
          id: true,
          alias: true
        }
      }
    })
    return user.customerInternalBeneficiaries;
  }
}