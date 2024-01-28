import { ApiProperty } from "@nestjs/swagger";

export class ClienteCriarDto {

    @ApiProperty({
        description: "Nome do cliente",
        example: "Cliente teste"
    })
    public readonly nome?: string;

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