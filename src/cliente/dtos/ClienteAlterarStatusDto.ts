import { ApiProperty } from "@nestjs/swagger";

export class ClienteAlterarStatusDto {
    @ApiProperty({
        description: "CPF",
        minimum: 11,
        example: "12345678909"
    })
    public readonly cpf?: string;

    @ApiProperty({
        description: "E-mail",
        example: "cliente@teste.com.br"
    })
    public readonly email?: string;
}