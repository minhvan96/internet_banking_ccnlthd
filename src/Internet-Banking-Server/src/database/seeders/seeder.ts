import { Injectable, Logger } from '@nestjs/common';
import { UserSeederService } from './identity/user/user-seeder.service';
import { RoleSeederService } from './identity/role/role-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService,
    private readonly roleSeederService: RoleSeederService,
  ) {
  }

  async seedAsync() {
    await this.seedUsersAsync()
      .then(completed => {
        this.logger.debug('Successfully completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
    await this.seedRolesAsync()
      .then(completed => {
        this.logger.debug('Successfully completed seeding roles...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding roles...');
        Promise.reject(error);
      });
  }

  async seedUsersAsync() {
    return await Promise.all(this.userSeederService.create())
      .then(createdUsers => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of languages created : ' +
          // Remove all null values and return only created languages.
          createdUsers.filter(
            nullValueOrCreatedUser => nullValueOrCreatedUser,
          ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  async seedRolesAsync() {
    return await Promise.all(this.roleSeederService.create())
      .then(createdRoles => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of languages created : ' +
          // Remove all null values and return only created languages.
          createdRoles.filter(
            nullValueOrCreatedRole => nullValueOrCreatedRole,
          ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}