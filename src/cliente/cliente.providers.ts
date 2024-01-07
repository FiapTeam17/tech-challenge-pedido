import {
    IAlterarClienteUseCase,
    IClienteRepositoryGateway,
    ICriarClienteUseCase,
    IObterClienteUseCase
} from "./interfaces";
import {AlterarClienteUseCase, CriarClienteUseCase, ObterClienteUseCase} from "./usecases";
import {DataSource} from "typeorm";
import {ClienteModel} from "./gateways";
import {DATA_SOURCE} from "../common/constants";

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
    },
    {
        provide: IClienteRepositoryGateway,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ClienteModel),
        inject: [DATA_SOURCE],
    },
];