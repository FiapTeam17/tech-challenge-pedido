import { DataSource, Equal, Repository } from 'typeorm';
import { IProdutoRepositoryGateway } from '../interfaces';
import { ProdutoModel } from './models';
import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ProdutoAlterarDto, ProdutoCriarDto, ProdutoRetornoDto } from '../dtos';
import { ProdutoCategoriaEnum, ProdutoCategoriaEnumMapper } from '../types';

export class ProdutoMySqlRepositoryGateway implements IProdutoRepositoryGateway {

    private produtoRepository: Repository<ProdutoModel>;

    constructor(
      private dataSource: DataSource,
      private logger: Logger
    ) {
        this.produtoRepository = this.dataSource.getRepository(ProdutoModel);
    }

    async excluir(id: number): Promise<void> {
        try {
            await this.produtoRepository.delete(id);
        }
        catch (e) {
            //TODO: este if deve ser removido assim que o usecase de exclusão verificar a associação de pedido x produto
            if(e.code === 'ER_ROW_IS_REFERENCED_2'){
                throw new BadRequestException("Produto utilizado em pedidos!");
            }
            throw e;
        }
    }

    async obterPorId(id: number): Promise<ProdutoRetornoDto> {

        const produtoEntity = await this.produtoRepository.findOneBy({ id: Equal(id) });
        return produtoEntity?.getProdutoDto();
    }

    async obterPorCategoria(categoria: ProdutoCategoriaEnum): Promise<ProdutoRetornoDto[]> {

        const produtosEntities = await this.produtoRepository.findBy({
            categoria: Equal(ProdutoCategoriaEnumMapper.enumParaString(categoria))
        });
        return produtosEntities.map(pe => pe.getProdutoDto());
    }
    async criar(dto: ProdutoCriarDto): Promise<ProdutoRetornoDto> {

        const retornoDto = await this.produtoRepository.save(new ProdutoModel(dto));
        return retornoDto.getProdutoDto();
    }
    async alterar(produto: ProdutoAlterarDto): Promise<ProdutoRetornoDto> {
        const produtoModel = new ProdutoModel(produto);
        const retornoDto = await this.produtoRepository.update(produtoModel.id, produtoModel);
        if(retornoDto.affected !== 1){
            throw new InternalServerErrorException("Não foi possível atualizar o produto");
        }
        return produtoModel.getProdutoDto();
    }
}
