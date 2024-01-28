import { ProdutoAlterarDto, ProdutoCriarDto, ProdutoRetornoDto } from '../dtos';
import { ProdutoCategoriaEnum } from '../types';

export const IProdutoRepositoryGateway: unique symbol = Symbol("IProdutoRepositoryGateway");

export interface IProdutoRepositoryGateway {
    obterPorId(produtoId: number): Promise<ProdutoRetornoDto>;
    obterPorCategoria(categoria: ProdutoCategoriaEnum): Promise<ProdutoRetornoDto[]>;
    criar(produto: ProdutoCriarDto): Promise<ProdutoRetornoDto>;
    alterar(produto: ProdutoAlterarDto): Promise<ProdutoRetornoDto>;
    excluir(produtoId: number): Promise<void>;
}
