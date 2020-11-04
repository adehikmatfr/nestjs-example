import {
  Module,
  OnModuleInit,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaksController } from './controllers/taks.controller';
import { DatabaseService } from '@app/content-db/services/database.service';
import { AuthorizationMiddleware } from '@app/content-middleware/auth.service';

@Module({
  imports: [],
  controllers: [AppController, TaksController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, NestModule {
  configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(AuthorizationMiddleware).forRoutes('*');
  }

  async onModuleInit() {
    await DatabaseService.setup();
  }
}
