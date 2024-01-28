import { IObterProdutoUseCase, IProdutoRepositoryGateway } from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { ProdutoRetornoDto } from '../dtos';
import { ProdutoCategoriaEnumMapper } from '../types';

export class ObterProdutoUseCase implements IObterProdutoUseCase{

    constructor(
        private produtoRepositoryGateway: IProdutoRepositoryGateway,
        private logger: Logger
    ) { }

    public async obterPorId(id: number): Promise<ProdutoRetornoDto> {
        const produtoFound: ProdutoRetornoDto = await this.produtoRepositoryGateway.obterPorId(id);
        if (produtoFound == undefined) {
            throw new BadRequestException("Produto não encontrado!");
        }

        return produtoFound;
    }

    public async obterPorCategoria(categoria: string): Promise<ProdutoRetornoDto[]> {
        return await this.produtoRepositoryGateway.obterPorCategoria(
          ProdutoCategoriaEnumMapper.stringParaEnum(categoria.toUpperCase()));
    }
}
