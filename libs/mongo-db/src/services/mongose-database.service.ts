import { ConnectionOptions, Mongoose } from 'mongoose';

export class MongoseDatabaseService {
  public static mongoose: Mongoose = new Mongoose();

  static connect(
    databaseConnectionString?: string,
    databaseConnectionOptions?: ConnectionOptions,
  ) {
    return this.mongoose.connect(
      databaseConnectionString,
      databaseConnectionOptions,
    );
  }
}
