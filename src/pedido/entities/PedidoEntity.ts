import { ClienteEntity } from '../../cliente/entities';
import { PedidoItemEntity } from './PedidoItemEntity';
import { PedidoStatusEnum } from '../types';
import { PedidoDto } from '../dtos';
import { ProdutoEntity } from '../../produto/entities';
import { BadRequestException } from '@nestjs/common';

export class PedidoEntity {
    get dataCadastro(): Date | undefined {
        return this._dataCadastro;
    }

    set dataCadastro(value: Date) {
        this._dataCadastro = value;
    }

    get dataConclusao(): Date | undefined {
        return this._dataConclusao;
    }

    set dataConclusao(value: Date) {
        this._dataConclusao = value;
    }
    get valorTotal(): number {
        let valorTotal = 0;
        this.itens?.forEach(i => valorTotal += i.valorTotal);
        return valorTotal;
    }

    get id(): number | undefined {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get cliente(): ClienteEntity | undefined {
        return this._cliente;
    }

    set cliente(value: ClienteEntity) {
        this._cliente = value;
    }

    get observacao(): string | undefined {
        return this._observacao;
    }

    set observacao(value: string) {
        this._observacao = value;
    }

    get status(): PedidoStatusEnum | undefined {
        return this._status;
    }

    set status(value: PedidoStatusEnum) {
        this._status = value;
    }

    get itens(): PedidoItemEntity[] | undefined {
        return this._itens;
    }

    set itens(value: PedidoItemEntity[] | undefined) {
        this._itens = value;
    }

    // get pagamentos(): PagamentoEntity[] | undefined {
    //     return this._pagamentos;
    // }
    //
    // set pagamentos(value: PagamentoEntity[]) {
    //     this._pagamentos = value;
    // }

    constructor(
        private _id?: number,
        private _cliente?: ClienteEntity,
        private _observacao?: string,
        private _status?: PedidoStatusEnum,
        private _dataCadastro?: Date,
        private _dataConclusao?: Date,
        private _itens?: PedidoItemEntity[],
        // private _pagamentos?: PagamentoEntity[],
    ) {
    }

    static getInstancia(id: number, status: PedidoStatusEnum): PedidoEntity {
        const pedido = new PedidoEntity();
        pedido._id = id;
        pedido._status = status;
        return pedido;
    }

    setStatus(newStatus: PedidoStatusEnum) {
        switch (newStatus) {
            case PedidoStatusEnum.PROBLEMA_DE_PAGAMENTO:
                if (this._status === undefined || this._status === PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO) {
                    this._status = newStatus;
                    return;
                }
                throw new BadRequestException("O status do pedido não permite essa alteração");

            case PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
                if (this._status === undefined || this._status === PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO) {
                    this._status = newStatus;
                    return;
                }
                throw new BadRequestException("O status do pedido não permite essa alteração");

            case PedidoStatusEnum.RECEBIDO:
                if (this._status === PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO) {
                    this._status = newStatus;
                    break;
                }
                throw new BadRequestException("O status do pedido não permite essa alteração");

            case PedidoStatusEnum.EM_PREPARACAO:
                if (this._status === PedidoStatusEnum.RECEBIDO) {
                    this._status = newStatus;
                    break;
                }
                throw new BadRequestException("O status do pedido não permite essa alteração");

            case PedidoStatusEnum.PRONTO:
                if (this._status === PedidoStatusEnum.EM_PREPARACAO) {
                    this._status = newStatus;
                    this._dataConclusao = new Date(Date.now());
                    break;
                }
                throw new BadRequestException("O status do pedido não permite essa alteração");

            case PedidoStatusEnum.FINALIZADO:
                if (this._status === PedidoStatusEnum.PRONTO) {
                    this._status = newStatus;
                    break;
                }
                throw new BadRequestException("O status do pedido não permite essa alteração");
        }
    }

    public getStatus(): PedidoStatusEnum {
        if (this._status === undefined) {
            this._status = PedidoStatusEnum.RECEBIDO;
        }
        return this._status;
    }

    public tempoEspera(): number {
        let dataFim: number = Date.now();
        if (this._dataConclusao) {
            dataFim = this._dataConclusao.getTime();
        }
        return dataFim - (this._dataCadastro !== undefined ? this._dataCadastro?.getTime() : Date.now());
    }

    removerCliente() {
        this._cliente = undefined;
    }

    public toPedidoDto(): PedidoDto {

        const itens = this.itens?.map(i => i.toPeditoItemDto()) || [];

        return new PedidoDto(
            this.status as never,
            this.dataCadastro as never,
            itens,
            this.observacao,
            this.cliente,
            this.dataConclusao,
            this.id
        );
    }

    // public toPedidoQrDataDto(qrDataMercadoPago: string): PedidoDto {
    //
    //     const itens = this.itens?.map(i => i.toPeditoItemDto()) || [];
    //
    //     return new PedidoDto(
    //         this.status as never,
    //         this.dataCadastro as never,
    //         itens,
    //         this.observacao,
    //         this.cliente,
    //         this.dataConclusao,
    //         this.id,
    //         qrDataMercadoPago
    //     );
    // }

    static getInstance(pedidoDto: PedidoDto): PedidoEntity {

        let cliente = undefined;
        if (pedidoDto.cliente) {
            cliente = new ClienteEntity(pedidoDto.cliente.id);
        }

        const pedido = new PedidoEntity(
            pedidoDto.id,
            cliente,
            pedidoDto.observacao,
            pedidoDto.status,
            pedidoDto.dataCadastro,
            pedidoDto.dataConclusao
        );

        pedido.itens = pedidoDto.itens?.map(i => {
            return new PedidoItemEntity(
                i.id,
                pedido,
                new ProdutoEntity(i.produto.id),
                i.quantidade,
                i.valorUnitario
            );
        });

        return pedido;
    }
}
