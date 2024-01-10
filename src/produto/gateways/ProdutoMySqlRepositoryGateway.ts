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

            this.logger.error(e);
            throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
        }
    }

    async obterPorId(id: number): Promise<ProdutoRetornoDto> {
        try {
            const produtoEntity = await this.produtoRepository.findOneBy({ id: Equal(id) });

            return produtoEntity?.getProdutoDto();

        } catch (e) {
            this.logger.error(e);
            throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
        }
    }

    async obterPorCategoria(categoria: ProdutoCategoriaEnum): Promise<ProdutoRetornoDto[]> {
        try {
            const produtosEntities = await this.produtoRepository.findBy({
                categoria: Equal(ProdutoCategoriaEnumMapper.enumParaString(categoria))
            });
            return produtosEntities.map(pe => pe.getProdutoDto());

        } catch (e) {
            this.logger.error(e);
            throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
        }
    }
    async criar(dto: ProdutoCriarDto): Promise<ProdutoRetornoDto> {
        try {
            const retornoDto = await this.produtoRepository.save(new ProdutoModel(dto));

            return retornoDto.getProdutoDto();

        } catch (e) {
            this.logger.error(e);
            throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
        }

    }
    async alterar(produto: ProdutoAlterarDto): Promise<ProdutoRetornoDto> {
        try {
            const retornoDto = await this.produtoRepository.save(new ProdutoModel(produto));
            return retornoDto.getProdutoDto();
        } catch (e) {
            this.logger.error(e);
            throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
        }

    }
}
