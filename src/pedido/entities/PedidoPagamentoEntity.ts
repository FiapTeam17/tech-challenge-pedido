import { PedidoEntity } from './PedidoEntity';
import { PedidoPagamentoDto } from '../dtos';

export class PedidoPagamentoEntity {
    get pagamentoId(): number {
        return this._pagamentoId;
    }

    set pagamentoId(value: number) {
        this._pagamentoId = value;
    }
    get id(): number | undefined{
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get pedido(): PedidoEntity | undefined{
        return this._pedido;
    }

    set pedido(value: PedidoEntity) {
        this._pedido = value;
    }

    get foiAprovado(): boolean | undefined{
        return this._foiAprovado;
    }

    set foiAprovado(value: boolean) {
        this._foiAprovado = value;
    }

    constructor(
        public _id?: number,
        public _pedido?: PedidoEntity,
        public _pagamentoId?: number,
        public _foiAprovado?: boolean
    ){}

    public toPeditoPagamentoDto(): PedidoPagamentoDto{
        return new PedidoPagamentoDto(
          this._pedido?.id,
          this._pagamentoId,
          this._foiAprovado,
          this._id
        );
    }

    static getInstance(pagamentoDto: PedidoPagamentoDto): PedidoPagamentoEntity{
        return new PedidoPagamentoEntity(
          pagamentoDto.id,
          new PedidoEntity(pagamentoDto.pedidoId),
          pagamentoDto.pagamentoId,
          pagamentoDto.foiAprovado
        );
    }
}
