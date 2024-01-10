import { ApiProperty } from '@nestjs/swagger';
import { CATEGORIAS_PRODUTO, ProdutoCategoriaEnum, ProdutoCategoriaEnumMapper } from '../types';

export class ProdutoDto {

    @ApiProperty({
        description: "Identificador",
        example: "123456"
    })
    public readonly id?: number;

    @ApiProperty({
        description: "Nome do produto",
        example: "Produto teste"
    })
    public readonly nome?: string;

    @ApiProperty({
        description: "Descição do produto",
        example: "Produto teste descrição"
    })
    public readonly descricao?: string;

    @ApiProperty({
        description: "Valor",
        example: "10.50"
    })
    public readonly valor?: number;

    @ApiProperty({
        description: "Categoria",
        example: "LANCHE",
        enum: ProdutoCategoriaEnum,
    })
    public readonly categoria?: ProdutoCategoriaEnum;

    @ApiProperty({
        description: "Imagem",
        example: "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"
    })
    public readonly imagem?: string;

    constructor(id?: number, nome?: string, descricao?: string, valor?: number, categoria?: ProdutoCategoriaEnum, imagem?: string) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        this.imagem = imagem;
    }

}
