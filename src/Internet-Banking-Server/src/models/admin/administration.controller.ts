import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AccessTokenGuard} from "../../auth/guards/access-token.guard";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateEmployeeRequest, CreateOrUpdateEmployeeCommand} from "./commands/create-or-update-employee.command";
import {DeleteEmployeeCommand} from "./commands/delete-employee.command";
import {GetEmployeeQuery} from "./queries/get-employee.query";

@Controller('/administration')
@ApiTags('Administration')
export class AdministrationController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus,
    ) {
    }
    @Post("/create-or-update-employee")
    @ApiOperation({ summary: "create employee" })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async createUpdateEmployee(@Body() request: CreateEmployeeRequest){
        return await this.commandBus.execute(new CreateOrUpdateEmployeeCommand(request))
    }

    @Post("/delete-employee/:id")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete employee" })
    @UseGuards(AccessTokenGuard)
    async deleteEmployee(@Param('id') employeeId: number){
        return await this.commandBus.execute(new DeleteEmployeeCommand(employeeId))
    }

    @Get("/get-employee")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get employee" })
    @UseGuards(AccessTokenGuard)
    async getEmployee(){
        return await this.queryBus.execute(new GetEmployeeQuery());
    }

}
