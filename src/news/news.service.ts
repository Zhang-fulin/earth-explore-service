import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsService {
  private supabase;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_KEY')!,
    );
  }

  async fetchTodayNews() {
    console.log('Fetching today\'s news...');
    const now = new Date();
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const currentDateISOString = startOfDay.toISOString();
    const { data, error } = await this.supabase
      .from('cctv-news')
      .select('*')
      .gte('time', currentDateISOString);

    if (error) {
      console.error('加载新闻失败:', error.message);
      return [];
    }

    const uniqueMap = new Map<string, any>();
    data.forEach(item => {
      if (!uniqueMap.has(item.content)) {
        uniqueMap.set(item.content, item);
      }
    });

    return Array.from(uniqueMap.values());
  }
}
