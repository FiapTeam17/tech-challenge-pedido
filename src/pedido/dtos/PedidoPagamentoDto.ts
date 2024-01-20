import { ApiProperty } from '@nestjs/swagger';

export class PedidoPagamentoDto {

    public readonly id: number;

    @ApiProperty({
        description: "Identificador do Pedido",
        example: "123456"
    })
    public readonly pedidoId: number;

    @ApiProperty({
        description: "Identificador do Pagamento",
        example: "123456"
    })
    public pagamentoId?: number;

    @ApiProperty({
        description: "Aprovação do Pagamento do Pedido",
        example: "True"
    })
    public foiAprovado: boolean;

    constructor(
        pedidoId: number,
        pagamentoId: number,
        foiAprovado: boolean,
        id?: number
    ) {
        this.pedidoId = pedidoId;
        this.foiAprovado = foiAprovado;
        this.pagamentoId = pagamentoId;
        this.id = id;
    }
}
