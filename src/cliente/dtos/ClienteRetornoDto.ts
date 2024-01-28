import {ApiProperty} from "@nestjs/swagger";

export class ClienteRetornoDto{

    @ApiProperty({
        description: "Identificador",
        example: "123456"
    })
    public id?: number;

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

    constructor(nome?: string, cpf?: string, email?: string, id?: number) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
    }

}