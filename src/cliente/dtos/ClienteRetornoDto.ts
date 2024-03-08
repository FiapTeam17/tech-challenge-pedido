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

    @ApiProperty({
        description: "Ativo",
        example: "false"
    })
    public readonly ativo: boolean;

    @ApiProperty({
        description: "Excluído",
        example: "false"
    })
    public readonly excluido: boolean;

    constructor(nome?: string, cpf?: string, email?: string, id?: number, ativo?: boolean, excluido?: boolean) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.ativo = ativo;
        this.excluido = excluido;
    }

}