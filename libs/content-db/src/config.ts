import { ConnectionOptions } from 'mongoose';

class Configuration {
  connectionString: string;
  connectionOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };
}

const configuration = new Configuration();

configuration.connectionString = 'mongodb://localhost:27017/test-db?ssl=false';
export default configuration;
