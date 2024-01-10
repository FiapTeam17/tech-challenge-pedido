import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../common/constants';
import { ClienteModel } from '../cliente/gateways';
import {
    IAlterarProdutoUseCase,
    ICriarProdutoUseCase,
    IExcluirProdutoUseCase,
    IObterProdutoUseCase,
    IProdutoRepositoryGateway,
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
    },
    {
        provide: IProdutoRepositoryGateway,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ClienteModel),
        inject: [DATA_SOURCE],
    },
];
