import { ProdutoCriarDto, ProdutoRetornoDto } from '../dtos';

export const ICriarProdutoUseCase: unique symbol = Symbol("ICriarProdutoUseCase");

export interface ICriarProdutoUseCase {
    criar(dto: ProdutoCriarDto): Promise<ProdutoRetornoDto>;
}
