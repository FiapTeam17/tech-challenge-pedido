import { PedidoDto } from '../dtos';
import { PedidoStatusEnum } from '../types';

export const IPedidoRepositoryGateway: unique symbol = Symbol("IPedidoRepositoryGateway");

export interface IPedidoRepositoryGateway {
    criar(pedido: PedidoDto): Promise<number | undefined>;
    atualizarStatus(pedido: PedidoDto): Promise<void>;
    obterPorId(pedidoId: number): Promise<PedidoDto>;
    obterEmAndamento(): Promise<PedidoDto[]>;
    obterPorStatusAndIdentificadorPagamento(status: PedidoStatusEnum, identificadorPagamento: string): Promise<PedidoDto[]>;
    obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<PedidoDto>;
}
