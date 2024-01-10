import { IAlterarClienteUseCase, ICriarClienteUseCase, IObterClienteUseCase } from './interfaces';
import { AlterarClienteUseCase, CriarClienteUseCase, ObterClienteUseCase } from './usecases';

export const clienteProviders = [
    {
        provide: IAlterarClienteUseCase,
        useFactory: () => AlterarClienteUseCase
    },
    {
        provide: ICriarClienteUseCase,
        useFactory: () => CriarClienteUseCase
    },
    {
        provide: IObterClienteUseCase,
        useFactory: () => ObterClienteUseCase
    }
];
