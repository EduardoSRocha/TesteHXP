import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../services/s3.service';
import * as fs from 'fs'; 
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('bucketName') bucketName: string,
  ): Promise<string> {
    if (!file || !file.path) {
      throw new Error('No file or file path found.');
    }

    const buffer = fs.readFileSync(file.path);
    console.log(`File size before upload: ${buffer.length} bytes`);

    if (buffer.length === 0) {
      throw new Error('The file is empty!');
    }

    const { originalname } = file;
    return await this.s3Service.uploadFile(bucketName, originalname, buffer);
  }
}
