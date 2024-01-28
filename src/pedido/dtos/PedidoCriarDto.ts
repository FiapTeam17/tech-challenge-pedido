import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PedidoItemCriarDto {

    @ApiProperty({
        description: "Quantidade do Item",
        example: "5"
    })
    public quantidade?: number;

    @ApiProperty({
        description: "Identificador do Produto",
        example: "123456"
    })
    public produtoId?: number
}

export class PedidoCriarDto {

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
        description: "Itens do Pedido",
        type: 'array',
        items: {
            oneOf: [
                { $ref: getSchemaPath(PedidoItemCriarDto) }
            ],
        },

    })
    public readonly itens: PedidoItemCriarDto[];
}
