import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { User } from "../../../entities/identity/user.entity";
import { NotFoundException } from "@nestjs/common";
import { CustomerInternalBeneficiary } from "../../../entities/customer-internal-beneficiary.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalBeneficiaryResponseModel } from "../response-models/internal-beneficiary.response-model";
import { UpdateInternalBeneficiaryCommand } from "./update-internal-beneficiary.command";

@CommandHandler(UpdateInternalBeneficiaryCommand)
export class UpdateInternalBeneficiaryHandler implements ICommandHandler<UpdateInternalBeneficiaryCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CustomerInternalBeneficiary)
    private readonly customerInternalBeneficiaryRepository: Repository<CustomerInternalBeneficiary>) {
  }

  async execute(command: UpdateInternalBeneficiaryCommand): Promise<InternalBeneficiaryResponseModel> {
    const user = await this.userRepository.findOne({
      where: {
        id: command.userId
      }
    });
    if (!user) {
      throw new NotFoundException(`Alias for account ${command.payload.bankAccountNumber} not found`);
    }

    const alias = await this.customerInternalBeneficiaryRepository.findOne({
      where: {
        bankAccount: {
          accountNumber: command.payload.bankAccountNumber
        },
        user: {
          id: command.userId
        }
      }
    });

    if(!alias)
      throw new NotFoundException(`Alias not found`);

    alias.alias = command.payload.alias;
    await this.customerInternalBeneficiaryRepository.save(alias);

    return new InternalBeneficiaryResponseModel(command.payload.alias, command.payload.bankAccountNumber);
  }
}