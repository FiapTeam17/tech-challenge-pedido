import { PedidoEntity } from '../entities';
import { PedidoStatusEnum } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoEmAndamentoDto {

    @ApiProperty({
        description: "Identificador do Pedido",
        example: "123456"
    })
    public readonly id?: number;

    @ApiProperty({
        description: "Observação",
        example: "Sem cebola"
    })
    public readonly observacao?: string;

    @ApiProperty({
        description: "Cliente",
        example: "123456"
    })
    public readonly clienteId?: number;

    @ApiProperty({
        description: "Status",
        example: "RECEBIDO",
        enum: PedidoStatusEnum
    })
    public readonly status?: PedidoStatusEnum;

    @ApiProperty({
        description: "Data e hora do cadastro",
        example: "2001-10-15 13:40:55"
    })
    public readonly dataCadastro?: Date;

    @ApiProperty({
        description: "Tempo de espera em minutos",
        example: "100"
    })
    public readonly tempoEspera?: number;

    constructor(pedido: PedidoEntity) {
        this.id = pedido.id;
        this.observacao = pedido.observacao;
        this.clienteId = pedido.cliente?.id;
        this.status = pedido.status;
        this.dataCadastro = pedido.dataCadastro;
        this.tempoEspera = pedido.tempoEspera();
    }
}
