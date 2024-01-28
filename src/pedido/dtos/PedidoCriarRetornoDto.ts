import { ApiProperty } from '@nestjs/swagger';
import { PedidoRetornoDto } from './PedidoRetornoDto';

export class PedidoCriarRetornoDto extends PedidoRetornoDto{

    @ApiProperty({
        description: "QrCode do Mercado Pago",
        example: "00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D"
    })
    public readonly qrCodeMercadoPago: string;

}
