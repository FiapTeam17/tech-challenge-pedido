import { IObterPedidoUseCase, IPedidoRepositoryGateway } from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoRetornoDto } from '../dtos';

export class ObterPedidoUseCase implements IObterPedidoUseCase {

    constructor(
        private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        // private obterPagamentoUseCase: IObterPagamentoUseCase,
        private logger: Logger
    ) {
    }

    async obterPorId(id: number): Promise<PedidoRetornoDto> {
        const pedidoOp = await this.pedidoRepositoryGateway.obterPorId(id);
        if (pedidoOp == undefined) {
            this.logger.warn("Pedido não encontrado. id={}", id);
            throw new BadRequestException("Pedido não encontrado");
        }

        return PedidoRetornoDto.getInstance(pedidoOp);
    }
}
