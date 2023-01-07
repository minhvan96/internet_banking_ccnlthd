import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../entities/identity/user.entity";
import {Repository} from "typeorm";
import {CreateOrUpdateEmployeeCommand} from "./create-or-update-employee.command";
import {BadRequestException} from "@nestjs/common";
import {RoleConstants} from "../../../common/constants/role-constants";
import {Role} from "../../../entities/identity/role.entity";

@CommandHandler(CreateOrUpdateEmployeeCommand)
export class CreateOrUpdateEmployeeHandler implements ICommandHandler<CreateOrUpdateEmployeeCommand>{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {
    }
    async execute(command: CreateOrUpdateEmployeeCommand): Promise<any> {
        let newUser;
        if(command.payload.id){
            const userExist = await this.checkUserNameOrEmailExist(command.payload.username, command.payload.email)
            if (userExist.email == command.payload.email) {
                throw new BadRequestException(`Email ${userExist.email} is exist`)
            }

            newUser = await this.userRepository.findOneBy({
                 id: command.payload.id
            });

            if(!newUser){
                throw new BadRequestException("User is not exist");
            }

            newUser.password = command.payload.password;
            newUser.firstName = command.payload.firstName;
            newUser.lastName = command.payload.lastName;
            newUser.email = command.payload.email;
            newUser.phoneNumber = command.payload.phoneNumber;
        }else {

            const user : User= await this.checkUserNameOrEmailExist(command.payload.username, command.payload.email)
            if(user){
                if (user.userName === command.payload.username) {
                    throw new BadRequestException(`User name ${user.userName} is exist`)
                }

                if (user.email === command.payload.email) {
                    throw new BadRequestException(`Email ${user.email} is exist`)
                }
            }

            const customerRole = await this.roleRepository.findOne({
                where: {
                    name: RoleConstants.Employee
                }
            });
            newUser = new User(command.payload.username,
                command.payload.password,
                command.payload.email,
                command.payload.firstName,
                command.payload.lastName,
                command.payload.phoneNumber);
            newUser.roles = [];
            newUser.roles.push(customerRole);
            newUser.isVerified = true;
        }

        return await this.userRepository.save(newUser);
    }

    async checkUserNameOrEmailExist(username: string, email: string){
        return await this.userRepository.findOne({
            where: [
                {userName: username},
                {email: email}
            ]
        });
    }
}