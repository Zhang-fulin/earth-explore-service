import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news') // 所有接口都以 /news 开头
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('today') // 对应 GET /news/today
  getTodayNews() {
    return this.newsService.fetchTodayNews(); // 调用 service 中的方法
  }
}
