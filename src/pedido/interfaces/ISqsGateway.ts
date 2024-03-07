export const ISqsGateway: unique symbol = Symbol("ISqsGateway");

export interface ISqsGateway {
    sendMessage(queueUrl: string, messageBody: any): Promise<void>;
}
