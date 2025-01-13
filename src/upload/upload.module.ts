import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { S3Service } from '../services/s3.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Pasta temporária para armazenamento local
    }),
  ],
  controllers: [UploadController],
  providers: [S3Service],
})
export class UploadModule {}
