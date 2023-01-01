import {QueryHandler} from "@nestjs/cqrs";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

@QueryHandler(GetCustomerQuery)
export class GetDebtTransactionQuery {
    constructor(public readonly payload: DebtFilterRequest) {
    }
}

export class DebtFilterRequest{
    @ApiProperty()
    isCreated: boolean;

    @ApiProperty()
    isUnpaid: boolean;

    @IsNotEmpty()
    userId: number;

}