import { PedidoDto } from '../dtos';

export const IPedidoRepositoryGateway: unique symbol = Symbol("IPedidoRepositoryGateway");

export interface IPedidoRepositoryGateway {
    criar(pedido: PedidoDto): Promise<number | undefined>;
    atualizarStatus(pedido: PedidoDto): Promise<void>;
    obterPorId(pedidoId: number): Promise<PedidoDto>;
}
