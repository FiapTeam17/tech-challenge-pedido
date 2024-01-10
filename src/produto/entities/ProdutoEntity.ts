import { ProdutoCategoriaEnum } from '../types';
import { BadRequestException } from '@nestjs/common';

export class ProdutoEntity {
    constructor(
      readonly id?: number,
        readonly nome?: string,
        readonly descricao?: string,
        readonly valor?: number,
        readonly categoria?: ProdutoCategoriaEnum,
        readonly imagem?: string
    ){}

     validar(){
        if(!this.nome){
            throw new BadRequestException("Nome é obrigatório");
        }else if(!this.valor){
            throw new BadRequestException("Valor é obrigatório");
        }
        else if(!this.categoria === undefined){
            throw new BadRequestException("Categoria é obrigatória");
        }
    }
}
