import { PedidoStatusEnum } from '../types';

export const IAtualizarStatusPedidoUseCase: unique symbol = Symbol("IAtualizarStatusPedidoUseCase");

export interface IAtualizarStatusPedidoUseCase {
    atualizarStatus(pedidoId: number, status: PedidoStatusEnum): Promise<void>;
    atualizarStatusPagamento(identificador: number, status: string): Promise<void>
}
