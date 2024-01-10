import { ProdutoDto } from '../../produto/dtos';
import { PedidoStatusEnum } from '../types';
import { ClienteDto } from '../../cliente/dtos';

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

export class PedidoDto {
  constructor(
    public readonly status: PedidoStatusEnum,
    public readonly dataCadastro: Date,
    public readonly itens?: PedidoItemDto[],
    public readonly observacao?: string,
    public readonly cliente?: ClienteDto,
    public readonly dataConclusao?: Date,
    public readonly id?: number,
    public readonly qrDataMercadoPago?: string,
  ) {
  }
}
