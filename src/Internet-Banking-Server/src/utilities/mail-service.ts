// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../entities/identity/user.entity';
// import { Repository } from 'typeorm';
//
// export class MailService{
//   private code;
//
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     private mailerService: MailerService) {
//     this.code = Math.floor(10000 + Math.random() * 90000);
//   }
//
//   async sendConfirmedEmail(user: User) {
//     const { email, fullname } = user
//     await this.mailerService.sendMail({
//       to: email,
//       subject: 'Welcome to Nice App! Email Confirmed',
//       template: 'confirmed',
//       context: {
//         fullname,
//         email
//       },
//     });
//
//   }
//   async sendConfirmationEmail(user: any) {
//     const { email, fullname } = await user
//     await this.mailerService.sendMail({
//       to: email,
//       subject: 'Welcome to Nice App! Confirm Email',
//       template: 'confirm',
//       context: {
//         fullname,
//         code: this.code
//       },
//     });
//   }
// }