import { AwsConfigService } from "../../config/aws";
import { ISqsGateway } from "../interfaces/ISqsGateway";

export class SqsGateway implements ISqsGateway {
    constructor(private readonly awsConfigService: AwsConfigService) { }

    async sendMessage(queueUrl: string, messageBody: any): Promise<void> {
        const sqs = this.awsConfigService.getAWSInstance();
        const message: any = JSON.stringify(messageBody);

        const params = {
            MessageBody: message,
            QueueUrl: queueUrl,
        };

        await sqs.sendMessage(params).promise();
    }
}