import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetDepositQuery } from "./get-deposit.query";
import { DepositRecordResponseModel } from "../response-models/deposit-record.response-model";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { RoleConstants } from "../../../common/constants/role-constants";
import { Repository } from "typeorm";
import { User } from "../../../entities/identity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DepositRecord } from "../../../entities/deposit-record.entity";

@QueryHandler(GetDepositQuery)
export class GetDepositHandler implements IQueryHandler<GetDepositQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(DepositRecord)
    private readonly depositRecordRepository: Repository<DepositRecord>
  ) {
  }

  async execute(query: GetDepositQuery): Promise<DepositRecordResponseModel[]> {
    const employee = await this.userRepository.findOne({
      where: {
        id: query.employeeId
      },
      relations: {
        roles: true
      }
    });
    if (!employee)
      throw new NotFoundException(`Employee with id = ${query.employeeId}} not found`);
    if (!employee.roles.find(x => x.name === RoleConstants.Employee))
      throw new ForbiddenException(`Require employee role`);

    const depositRecords = await this.depositRecordRepository.find({
      where: {
        bankAccount: {
          accountNumber: query.bankAccountNumber
        }
      },
      relations: {
        bankAccount: true,
        employee: true
      }
    });

    return depositRecords.map(record => new DepositRecordResponseModel(
      employee.id,
      employee.firstName + " " + employee.lastName,
      record.bankAccount.accountNumber,
      record.depositAmount
    ));
  }

}