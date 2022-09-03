import { MongooseOptionsFactory,MongooseModuleOptions} from '@nestjs/mongoose';
import { ConfigService } from './config.service';


export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {   
    return {
      uri: new ConfigService().get("DNS_MONGO"),
    };
  }
}