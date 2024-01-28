import { PedidoCriarDto } from '../dtos';
import { PedidoCriarRetornoDto } from '../dtos/PedidoCriarRetornoDto';

export const ICriarPedidoUseCase: unique symbol = Symbol("ICriarPedidoUseCase");

export interface ICriarPedidoUseCase {
    criar(pedido: PedidoCriarDto): Promise<PedidoCriarRetornoDto>;
}
