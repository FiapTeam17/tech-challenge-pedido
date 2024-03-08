import {ClienteAlterarDto, ClienteDto, ClienteRetornoDto} from "../dtos";
import { ClienteAlterarStatusDto } from "../dtos/ClienteAlterarStatusDto";

export const IClienteRepositoryGateway: unique symbol = Symbol("IClienteRepositoryGateway");
export interface IClienteRepositoryGateway {
    obterPorId(id: number): Promise<ClienteRetornoDto>;
    obterPorCpf(cpf: string): Promise<ClienteRetornoDto>;
    obterPorEmail(email: string): Promise<ClienteRetornoDto>;
    criar(dto: ClienteDto): Promise<ClienteRetornoDto>;
    alterar(dto: ClienteAlterarDto): Promise<ClienteRetornoDto>;
    inativar(dto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto>;
    excluir(dto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto>;
}
