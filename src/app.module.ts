import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { MongooseConfigService } from './config/mongo.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    PokemonModule
  ]
})
export class AppModule { }
