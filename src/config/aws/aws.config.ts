import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsConfigService {
    constructor() { }

    getAWSInstance(): AWS.SQS {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AAKIATYQB4B5GY67BIRMP',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'ffxm1U8KPsyYeLHlrJQtpK4GuJPco8/oXnUCoXryy',
            region: process.env.AWS_REGION || 'us-east-2'
        });

        return new AWS.SQS();
    }
}
