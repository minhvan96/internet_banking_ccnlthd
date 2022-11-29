import { Injectable, Logger } from '@nestjs/common';
import { UserSeederService } from './identity/user/user-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService,
  ) {
  }

  async seedAsync() {
    await this.users()
      .then(completed => {
        this.logger.debug('Successfully completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async users() {
    return await Promise.all(this.userSeederService.create())
      .then(createdUsers => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of languages created : ' +
          // Remove all null values and return only created languages.
          createdUsers.filter(
            nullValueOrCreatedLanguage => nullValueOrCreatedLanguage,
          ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}