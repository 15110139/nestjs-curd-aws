import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TerminusModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'database-2.c5c9evc5kwlh.us-east-1.rds.amazonaws.com',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '12345678',
    //   database: 'postgres',
    //   entities: [],
    //   synchronize: true,
    //   ssl: false,
    // }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
