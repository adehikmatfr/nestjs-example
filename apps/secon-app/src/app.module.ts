import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaksController } from './controllers/taks.controller';
import { DatabaseService } from '@app/content-db/services/database.service';

@Module({
  imports: [],
  controllers: [AppController, TaksController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await DatabaseService.setup();
  }
}
