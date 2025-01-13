import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';
import { S3Service } from './services/s3.service';
import { OnModuleInit } from '@nestjs/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('DATABASE_HOST')}:${configService.get<string>('DATABASE_PORT')}/${configService.get<string>('DATABASE_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    DashboardModule,
    UploadModule],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly s3Service: S3Service) {}

  async onModuleInit() {
    await this.s3Service.createBucket('meu-bucket-local');
  }
}