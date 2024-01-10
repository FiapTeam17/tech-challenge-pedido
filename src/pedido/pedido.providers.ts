import { IAtualizarStatusPedidoUseCase, ICriarPedidoUseCase, IObterPedidoUseCase } from './interfaces';
import { AtualizarStatusPedidoUseCase, CriarPedidoUseCase, ObterPedidoUseCase } from './usecases';

export const pedidoProviders = [
    {
        provide: IAtualizarStatusPedidoUseCase,
        useFactory: () => AtualizarStatusPedidoUseCase
    },
    {
        provide: ICriarPedidoUseCase,
        useFactory: () => CriarPedidoUseCase
    },
    {
        provide: IObterPedidoUseCase,
        useFactory: () => ObterPedidoUseCase
    }
];
