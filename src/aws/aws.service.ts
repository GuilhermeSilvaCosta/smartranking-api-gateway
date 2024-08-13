import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { AuthLoginUserDto } from 'src/auth/dtos/auth-login-user.dto';
import { AuthRegistryUserDto } from 'src/auth/dtos/auth-registry.dto';

@Injectable()
export class AwsService {
  private s3: AWS.S3;
  private userPool: CognitoUserPool;

  private readonly bucket = process.env.BUCKET;
  private readonly s3Host = `https://${this.bucket}.s3-${process.env.REGION}.amazonaws.com`;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
    });

    this.userPool = new CognitoUserPool({
      ClientId: process.env.COGNITO_CLIENT_ID,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
    });
  }

  private signUp(
    email: string,
    password: string,
    cognitoUserAttribute: CognitoUserAttribute[],
  ): Promise<ISignUpResult> {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        cognitoUserAttribute,
        null,
        (err, result) => {
          if (err) reject(err);

          resolve(result);
        },
      );
    });
  }

  registryUser(
    authRegistryUserDto: AuthRegistryUserDto,
  ): Promise<ISignUpResult> {
    const { email, password, ...personalData } = authRegistryUserDto;

    return this.signUp(email, password, [
      new CognitoUserAttribute({
        Name: 'name',
        Value: personalData.name,
      }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: personalData.phoneNumber,
      }),
    ]);
  }

  authUser(authLoginUserDto: AuthLoginUserDto): Promise<CognitoUserSession> {
    const { email, password } = authLoginUserDto;

    const userCognito = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(
        new AuthenticationDetails({
          Username: email,
          Password: password,
        }),
        {
          onSuccess: (result) => resolve(result),
          onFailure: (err) => reject(err),
        },
      );
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
