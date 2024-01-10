import { ProdutoDto } from '../dtos';

export const IObterProdutoUseCase: unique symbol = Symbol("IObterProdutoUseCase");

export interface IObterProdutoUseCase {
    obterPorId(id: number): Promise<ProdutoDto>;
    obterPorCategoria(categoria: string): Promise<ProdutoDto[]>
}
