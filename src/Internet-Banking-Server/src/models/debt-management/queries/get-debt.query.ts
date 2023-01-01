import {QueryHandler} from "@nestjs/cqrs";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

@QueryHandler(GetCustomerQuery)
export class GetDebt {
    constructor(public readonly payload: DebtFilterRequest) {
    }
}

export class DebtFilterRequest{
    @ApiProperty()
    isCreated: boolean;

    @ApiProperty()
    isPaid: boolean;

    @IsNotEmpty()
    userId: number;

}