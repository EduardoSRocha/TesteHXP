import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: 'http://localhost:4566',
      region: 'us-east-1',
      s3ForcePathStyle: true,
      accessKeyId: 'test',
      secretAccessKey: 'test',
    });
  }

  async uploadFile(bucketName: string, key: string, body: Buffer | string): Promise<string> {
    try {
      await this.s3
        .putObject({
          Bucket: bucketName,
          Key: key,
          Body: body,
        })
        .promise();

      const url = this.s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: key,
        Expires: 60 * 60,
      });

      return `Arquivo '${key}' enviado para o bucket '${bucketName}'! Acesse a imagem usando o link: ${url}`;
    } catch (error) {
      throw new Error(`Erro ao enviar arquivo: ${error.message}`);
    }
  }
  async createBucket(bucketName: string): Promise<void> {
    try {
      await this.s3.headBucket({ Bucket: bucketName }).promise();
      console.log(`Bucket '${bucketName}' já existe.`);
    } catch (error) {
      if (error.code === 'NotFound') {
        await this.s3.createBucket({ Bucket: bucketName }).promise();
        console.log(`Bucket '${bucketName}' criado com sucesso.`);
      } else {
        throw new Error(`Erro ao verificar/criar bucket: ${error.message}`);
      }
    }
  }
}
