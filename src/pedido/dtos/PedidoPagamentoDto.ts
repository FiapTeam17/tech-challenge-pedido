import { ApiProperty } from '@nestjs/swagger';

export class PedidoPagamentoDto {
    @ApiProperty({
        description: "Identificador do Pedido",
        example: "123456"
    })
    public readonly IdPedido: number;

    @ApiProperty({
        description: "Aprovação do Pagamento do Pedido",
        example: "True"
    })
    public foiAprovado: boolean;

    constructor(
        idPedido: number,
        foiAprovado: boolean
    ) {
        this.IdPedido = idPedido;
        this.foiAprovado = foiAprovado;
    }
}
