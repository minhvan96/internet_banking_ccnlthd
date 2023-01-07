import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../entities/identity/user.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {Role} from "../../entities/identity/role.entity";
import {AdministrationController} from "./administration.controller";
import {GetEmplyeeHandler} from "./queries/get-emplyee.handler";
import {CreateOrUpdateEmployeeHandler} from "./commands/create-or-update-employee.handler";
import {DeleteEmployeeHandler} from "./commands/delete-employee.handler";

@Module({imports: [TypeOrmModule.forFeature([User, Role]), CqrsModule],
    controllers: [AdministrationController],
    providers: [
        CreateOrUpdateEmployeeHandler,
        DeleteEmployeeHandler,
        GetEmplyeeHandler
    ]})
export class AdministrationModule {}
