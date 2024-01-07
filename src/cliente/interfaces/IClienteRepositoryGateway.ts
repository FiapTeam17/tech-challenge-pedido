import {ClienteAlterarDto, ClienteDto, ClienteRetornoDto} from "../dtos";

export const IClienteRepositoryGateway: unique symbol = Symbol("IClienteRepositoryGateway");
export interface IClienteRepositoryGateway {
    obterPorId(id: number): Promise<ClienteRetornoDto>;
    obterPorCpf(cpf: string): Promise<ClienteRetornoDto>;
    obterPorEmail(email: string): Promise<ClienteRetornoDto>;
    criar(dto: ClienteDto): Promise<ClienteRetornoDto>;
    alterar(dto: ClienteAlterarDto): Promise<ClienteRetornoDto>;
}
