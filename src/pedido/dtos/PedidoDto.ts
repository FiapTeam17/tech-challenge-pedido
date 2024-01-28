import { PedidoStatusEnum } from '../types';
import { ClienteDto } from '../../cliente/dtos';
import { PedidoItemDto } from './PedidoItemDto';

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
