import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  private readonly bucket = process.env.BUCKET;
  private readonly s3Host = `https://${this.bucket}.s3-${process.env.REGION}.amazonaws.com`;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
    });
  }

  async uploadFile(file: any, fileName: string) {
    const [, extension] = file.originalname.split('.');

    const key = `${fileName}.${extension}`;

    const params = {
      Body: file.buffer,
      Bucket: this.bucket,
      Key: key,
    };

    await this.s3.putObject(params).promise();
    return {
      url: `${this.s3Host}/${key}`,
    };
  }
}
