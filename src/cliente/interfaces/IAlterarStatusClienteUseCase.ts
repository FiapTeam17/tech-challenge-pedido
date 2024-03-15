import { ClienteRetornoDto } from "../dtos";
import { ClienteAlterarStatusDto } from "../dtos/ClienteAlterarStatusDto";

export const IAlterarStatusClienteUseCase: unique symbol = Symbol("IAlterarStatusClienteUseCase");

export interface IAlterarStatusClienteUseCase {
    ativarCliente(cliente: ClienteAlterarStatusDto): Promise<ClienteRetornoDto>;
    inativarCliente(cliente: ClienteAlterarStatusDto): Promise<ClienteRetornoDto>;
    excluirCliente(cliente: ClienteAlterarStatusDto): Promise<ClienteRetornoDto>;
    reativarCadastroCliente(cliente: ClienteAlterarStatusDto): Promise<ClienteRetornoDto>;
}