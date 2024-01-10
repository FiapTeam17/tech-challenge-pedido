import {
    IAlterarProdutoUseCase,
    ICriarProdutoUseCase,
    IExcluirProdutoUseCase,
    IObterProdutoUseCase,
} from './interfaces';
import { AlterarProdutoUseCase, CriarProdutoUseCase, ExcluirProdutoUseCase, ObterProdutoUseCase } from './usecases';

export const produtoProviders = [
    {
        provide: IAlterarProdutoUseCase,
        useFactory: () => AlterarProdutoUseCase
    },
    {
        provide: ICriarProdutoUseCase,
        useFactory: () => CriarProdutoUseCase
    },
    {
        provide: IObterProdutoUseCase,
        useFactory: () => ObterProdutoUseCase
    },
    {
        provide: IExcluirProdutoUseCase,
        useFactory: () => ExcluirProdutoUseCase
    }
];
