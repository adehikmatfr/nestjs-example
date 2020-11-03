import { MongooseGenericRepositoryService } from '@app/mongo-db/services/mongose-generic.service';
import { DatabaseService } from '@app/content-db/services/database.service';

import { Taks } from '@app/content-db/entities/taks';

export class RepositoryService {
  public static taks = new MongooseGenericRepositoryService(
    Taks,
    DatabaseService.mongoose,
  );
}
