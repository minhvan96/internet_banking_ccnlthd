import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSeederService } from './role-seeder.service';
import { Role } from 'src/entities/identity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleSeederService],
  exports: [RoleSeederService],
})
export class RoleSeederModule {

}