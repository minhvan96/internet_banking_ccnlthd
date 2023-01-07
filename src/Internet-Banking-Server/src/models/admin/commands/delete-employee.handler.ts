import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteEmployeeCommand} from "./delete-employee.command";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../entities/identity/user.entity";
import {Repository} from "typeorm";
import {BadRequestException} from "@nestjs/common";

@CommandHandler(DeleteEmployeeCommand)
export class DeleteEmployeeHandler implements ICommandHandler<DeleteEmployeeCommand>{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }
    async execute(command: DeleteEmployeeCommand): Promise<any> {
        let user : User = await this.userRepository.findOneBy({
            id : command.payload
        })

        if(!user){
            throw new BadRequestException("User id no found");
        }

        user.isDeleted = true;
        return await this.userRepository.save(user);
    }

}