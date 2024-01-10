import { IAlterarProdutoUseCase, IProdutoRepositoryGateway } from '../interfaces';
import { Logger } from '@nestjs/common';
import { ProdutoAlterarDto, ProdutoCriarDto, ProdutoRetornoDto } from '../dtos';
import { ProdutoEntity } from '../entities';

export class AlterarProdutoUseCase implements IAlterarProdutoUseCase{
    constructor( 
        private produtoRepositoryGateway: IProdutoRepositoryGateway,
        private logger: Logger){}

    public async alterar(dto: ProdutoAlterarDto): Promise<ProdutoRetornoDto> {
        const produto = this.mapDtoToDomain(dto);

        produto.validar();

        return await this.produtoRepositoryGateway.alterar(dto);
    }

    private mapDtoToDomain(dto: ProdutoCriarDto): ProdutoEntity {
        return new ProdutoEntity(undefined, dto.nome, dto.descricao, dto.valor, dto.categoria, dto.imagem);
    }
}
