import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/identity/role.entity';
import { roles } from './role-seeder.data';

@Injectable()
export class RoleSeederService {
  constructor(@InjectRepository(Role)
              private readonly roleRepository: Repository<Role>) {
  }

  create(): Array<Promise<Role>> {
    return roles.map(async (role: Role) => {
      return await this.roleRepository
        .findOneBy({
          name: role.name,
        })
        .then(async newRole => {
          // We check if a role already exists.
          // If it does don't create a new one.
          if (newRole) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(role).then(() => { ... });
            await this.roleRepository.save(role),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}