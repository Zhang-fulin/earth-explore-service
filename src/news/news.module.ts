import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
