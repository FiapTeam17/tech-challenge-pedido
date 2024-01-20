import { ProdutoDto } from '../../produto/dtos';

export class PedidoItemDto {
  constructor(
    public readonly produto: ProdutoDto,
    public readonly quantidade: number,
    public readonly valorUnitario: number,
    public readonly valorTotal: number,
    public readonly pedidoId?: number,
    public readonly id?: number,
  ) {
  }

}
