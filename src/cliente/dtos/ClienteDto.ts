import {ApiProperty} from "@nestjs/swagger";

export class ClienteDto {

    @ApiProperty({
        description: "Identificador",
        example: "123456"
    })
    public id?: number;

    @ApiProperty({
        description: "Nome do cliente",
        example: "Cliente teste"
    })
    public nome?: string;

    @ApiProperty({
        description: "CPF",
        minimum: 11,
        example: "12345678909"
    })
    public cpf?: string;

    @ApiProperty({
        description: "E-mail",
        example: "cliente@teste.com.br"
    })
    public email?: string;

    @ApiProperty({
        description: "Ativo",
        example: "false"
    })
    public ativo: boolean;

    @ApiProperty({
        description: "Excluído",
        example: "false"
    })
    public excluido: boolean;
}