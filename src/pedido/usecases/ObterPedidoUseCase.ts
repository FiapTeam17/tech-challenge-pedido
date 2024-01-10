import { IObterPedidoUseCase, IPedidoRepositoryGateway } from '../interfaces';
import { BadRequestException, Logger, NotImplementedException } from '@nestjs/common';
import { PedidoEmAndamentoDto, PedidoPagamentoDto, PedidoRetornoDto } from '../dtos';
import { PedidoEntity } from '../entities';
import { StatusPedidoEnumMapper } from '../types';

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

    async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
        const pedidoDtos = await this.pedidoRepositoryGateway.obterEmAndamento();
        if (pedidoDtos == undefined) {
            this.logger.warn("Pedidos não retornados");
            throw new BadRequestException("Pedido não encontrado");
        }

        return pedidoDtos.map(pe => new PedidoEmAndamentoDto(PedidoEntity.getInstance(pe)));
    }

    async obterPorStatusAndIdentificadorPagamento(status: string, identificadorPagamento: string): Promise<PedidoRetornoDto[]> {
        const pedidos = await this.pedidoRepositoryGateway.obterPorStatusAndIdentificadorPagamento(StatusPedidoEnumMapper.stringParaEnum(status), identificadorPagamento);

        return pedidos.map(p => PedidoRetornoDto.getInstance(p));
    }

    async obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<PedidoRetornoDto> {
        const pedidoDto = await this.pedidoRepositoryGateway.obterPorIdentificadorPagamento(identificadorPagamento);

        if (pedidoDto == undefined) {
            this.logger.warn("Pedido não encontrado. identificadorPagamento={}", identificadorPagamento);
            throw new BadRequestException("Pedido não encontrado");
        }

        return PedidoRetornoDto.getInstance(pedidoDto);
    }

    async consultaStatusPagamento(idPedido: number): Promise<PedidoPagamentoDto> {
        throw new NotImplementedException();
        // const pedidoOp = await this.pedidoRepositoryGateway.obterPorId(idPedido);
        // if (pedidoOp == undefined) {
        //     this.logger.warn("Pedido não encontrado.");
        //     return new PedidoPagamentoDto(idPedido, false);
        // }
        // const pedidoDto = pedidoOp.get();
        // const pagamentosDto = await this.obterPagamentoUseCase.obtemPagamentoPorPedidoId(pedidoDto.id!);
        // if (pagamentosDto == undefined || pagamentosDto.length == 0) {
        //     this.logger.warn("Pagamento não encontrado.");
        //     return new PedidoPagamentoDto(pedidoDto.id!, false);
        // }
        //
        // const existeAlgumPagamentoPago = pagamentosDto.some(x => x.status === StatusPagamento.PAGO);
        // return new PedidoPagamentoDto(pedidoDto.id!, existeAlgumPagamentoPago);
    }
}
