import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PedidoDto } from './PedidoDto';
import { PedidoStatusEnum } from '../types';
import { PedidoItemDto } from './PedidoItemDto';

export class PedidoItemRetornoDto {
    @ApiProperty({
        description: "Identificador do Item",
        example: "123456"
    })
    public readonly id?: number;
    
    @ApiProperty({
        description: "Quantidade do Item",
        example: "5"
    })
    public quantidade?: number;

    @ApiProperty({
        description: "Valor Unitário do Item",
        example: "5.6"
    })
    public valorUnitario?: number;

    @ApiProperty({
        description: "Valor Total do Item",
        example: "5.6"
    })
    public valorTotal?: number;

    @ApiProperty({
        description: "Identificador do Produto",
        example: "123456"
    })
    public produtoId?: number
}

export class PedidoRetornoDto {

    @ApiProperty({
        description: "Identificador",
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
        description: "Itens do Pedido",
        type: 'array',
        items: {
            oneOf: [
                { $ref: getSchemaPath(PedidoItemRetornoDto) }
            ],
        },

    })
    public readonly itens: PedidoItemRetornoDto[];

    static getInstance(pedido: PedidoDto): PedidoRetornoDto {
        return {
            id: pedido.id,
            observacao: pedido.observacao,
            cliente: pedido.cliente,
            status: pedido.status,
            itens: pedido.itens?.map(i => PedidoRetornoDto.getItemInstance(i)),
        } as PedidoRetornoDto;
    }

    private static getItemInstance(item: PedidoItemDto): PedidoItemRetornoDto {
        return {
            id: item.id,
            produtoId: item.produto?.id,
            quantidade: item.quantidade,
            valorUnitario: item.valorUnitario,
            valorTotal: item.valorTotal
        }
    }
}
