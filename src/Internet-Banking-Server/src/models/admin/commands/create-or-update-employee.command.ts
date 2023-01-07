import {ApiProperty} from "@nestjs/swagger";

export class CreateOrUpdateEmployeeCommand {
    constructor(
        public readonly payload: CreateEmployeeRequest
    ) {
    }
}

export class CreateEmployeeRequest{
    @ApiProperty({description: 'username of user, only use for create'})
    public username: string;
    @ApiProperty({description: 'password of user, only use for create'})
    public password: string;
    @ApiProperty({description: 'email of user'})
    public email: string;
    @ApiProperty({description: 'firstname of user'})
    public firstName: string;
    @ApiProperty({description: 'lastname of user'})
    public lastName: string;
    @ApiProperty({description: "phone number of user"})
    public phoneNumber: string;
    @ApiProperty({description: 'id of user, only use for update'})
    public id?: number


    constructor(username: string, password: string, email: string, firstName: string, lastName: string, phoneNumber: string, id: number) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.id = id;
    }
}