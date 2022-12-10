import { Module } from '@nestjs/common';
import {DebtManagementController} from "./debt-management.controller";

@Module({
    controllers: [DebtManagementController],
})
export class DebtManagementModule {


}
