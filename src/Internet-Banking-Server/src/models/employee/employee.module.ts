import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankInternalAccount } from "../../entities/bank-internal-account.entity";
import { User } from "../../entities/identity/user.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { EmployeeController } from "./employee.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User, BankInternalAccount]), CqrsModule],
  controllers: [EmployeeController],
  providers: []
})
export class EmployeeModule {
}
