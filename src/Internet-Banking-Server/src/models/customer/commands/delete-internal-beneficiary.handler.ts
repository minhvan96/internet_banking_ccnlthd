import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { User } from "../../../entities/identity/user.entity";
import { NotFoundException } from "@nestjs/common";
import { CustomerInternalBeneficiary } from "../../../entities/customer-internal-beneficiary.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalBeneficiaryResponseModel } from "../response-models/internal-beneficiary.response-model";
import { DeleteInternalBeneficiaryCommand } from "./delete-internal-beneficiary.command";

@CommandHandler(DeleteInternalBeneficiaryCommand)
export class DeleteInternalBeneficiaryHandler implements ICommandHandler<DeleteInternalBeneficiaryCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CustomerInternalBeneficiary)
    private readonly customerInternalBeneficiaryRepository: Repository<CustomerInternalBeneficiary>) {
  }

  async execute(command: DeleteInternalBeneficiaryCommand): Promise<InternalBeneficiaryResponseModel> {
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
          accountNumber: command.payload.bankAccountNumber,
        },
        user: {
          id: command.userId
        },
        alias: command.payload.alias
      }
    });

    if(!alias)
      throw new NotFoundException(`Alias not found`);

    await this.customerInternalBeneficiaryRepository.remove(alias);

    return new InternalBeneficiaryResponseModel(command.payload.alias, command.payload.bankAccountNumber);
  }
}