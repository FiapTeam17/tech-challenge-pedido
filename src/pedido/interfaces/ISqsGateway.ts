export const ISqsGateway: unique symbol = Symbol("ISqsGateway");

export interface ISqsGateway {
    sendMessage(messageGroupId:string, queueUrl: string, messageBody: any): Promise<void>;
}
