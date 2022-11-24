// import { Injectable } from '@nestjs/common';
// import { User } from '../../entities/user.entity';
// import { Repository, UpdateResult } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
//
// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {
//   }
//
//   async finUserByUsername(username: string): Promise<User> {
//     try {
//       return await this.userRepository.findOne({where: {username}});
//     } catch (error) {
//       console.log('catch');
//       return null;
//     }
//   }
//
//   async update(id: number, dto: UpdateUserDto): Promise<UpdateResult> {
//     return await this.userRepository.update(id, dto);
//   }
//
//   async getAllUsers() {
//     return await this.userRepository.find();
//   }
// }
