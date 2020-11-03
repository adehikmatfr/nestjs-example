import { MongoseDatabaseService } from '@app/mongo-db/services/mongose-database.service';
import configuration from '@app/content-db/config';

export class DatabaseService extends MongoseDatabaseService {
  static async setup() {
    await this.connect(
      configuration.connectionString,
      configuration.connectionOptions,
    );
  }
}
