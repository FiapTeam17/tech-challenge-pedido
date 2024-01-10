import { ICriarProdutoUseCase, IProdutoRepositoryGateway } from '../interfaces';
import { Logger } from '@nestjs/common';
import { ProdutoCriarDto, ProdutoRetornoDto } from '../dtos';
import { ProdutoEntity } from '../entities';

export class CriarProdutoUseCase implements ICriarProdutoUseCase{
    constructor( 
        private produtoRepositoryGateway: IProdutoRepositoryGateway,
        private logger: Logger,
     ){}

    public async criar(dto: ProdutoCriarDto): Promise<ProdutoRetornoDto> {
        
        const produto = this.mapDtoToDomain(dto);

        produto.validar();
        return await this.produtoRepositoryGateway.criar(dto);
    }

    private mapDtoToDomain(dto: ProdutoCriarDto): ProdutoEntity {
        return new ProdutoEntity(undefined, dto.nome, dto.descricao, dto.valor, dto.categoria, dto.imagem);
    }
    
}
