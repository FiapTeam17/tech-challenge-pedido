import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsConfigService {
    constructor() { }

    getAWSInstance(): AWS.SQS {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'ASIAZI2LDS7NNMTNKZFJ',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'QkyJD3Id/3Ww0a8wkZMxB074o8SWq0Ipt4qtQjW+',
            region: process.env.AWS_REGION || 'us-east-1',
            sessionToken: process.env.AWS_SESSION_TOKEN || 'FwoGZXIvYXdzELD//////////wEaDOJDZUOjUVdeOcz7jiLEARhNzxLjE12tRQc1G6ZZbV2O3Q//BwmrebQlTDXikguCE1smPfUzDl4TGkvaETQ9EEa2skiTCzdxUbs3xUhyeU2y6r3ua2KhMX35SofiI4VrOa+gaNPglnFS/pqUHovmaSE+OVPf3oye+TzxARMqS75dF+srPu6ikz5iMX/JiWY1/zhvgukMlSVAbWvcBqvBzsYlWb9+LP8AcQvz7fydpqcDzcu2SaVWuVPE3KPuzyvUgUFa3R193ee53QEE1YOKQzBAt+oos72erwYyLTXVIHAKQMk9GyQd5dHgseIKg2XI5Dm4n0L7vXUgjQj3+SFkXpTJ56t6eb9bOg==',
        });

        return new AWS.SQS();
    }
}