import { IAtualizarStatusPedidoUseCase, IPedidoRepositoryGateway } from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoStatusEnum, StatusPedidoEnumMapper, StatusPagamentoEnum } from '../types';
import { PedidoDto } from '../dtos';
import { PedidoEntity } from '../entities';
import { ISqsGateway } from '../interfaces/ISqsGateway';

export class AtualizarStatusPedidoUseCase implements IAtualizarStatusPedidoUseCase {

    private sqsUrl: string;

    constructor(
        private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        private readonly sqsGateway: ISqsGateway,
        private logger: Logger
    ) {
        this.sqsUrl = process.env.QUEUE_URL || "https://sqs.us-east-1.amazonaws.com/637423294426/";
    }

    async atualizarStatus(pedidoId: number, status: PedidoStatusEnum): Promise<void> {
        const pedidoDto: PedidoDto = await this.pedidoRepositoryGateway.obterPorId(pedidoId);
        if (pedidoDto == undefined) {
            this.logger.warn("Pedido id={} não encontrado", pedidoId);
            throw new BadRequestException("Produto não encontrado!");
        }

        const pedido = PedidoEntity.getInstance(pedidoDto);
        pedido.setStatus(status);

        await this.pedidoRepositoryGateway.atualizarStatus(pedido.toPedidoDto());
    }

    async atualizarStatusPagamento(identificador: number, status: StatusPagamentoEnum): Promise<void> {
        const pedidoDto: PedidoDto = await this.pedidoRepositoryGateway.obterPorId(identificador);
        if (pedidoDto == undefined) {
            this.logger.warn("Pedido id={} não encontrado", identificador);
            throw new BadRequestException("Produto não encontrado!");
        }

        if (status === StatusPagamentoEnum.PAGO) {
            this.sqsGateway.sendMessage(this.sqsUrl.concat("pedido-to-producao-criar-pedido"), pedidoDto);
        }
        else if (status === StatusPagamentoEnum.CANCELADO || status === StatusPagamentoEnum.ERRO) {
            this.atualizarStatus(identificador, PedidoStatusEnum.PROBLEMA_DE_PAGAMENTO)
        }
    }
}
