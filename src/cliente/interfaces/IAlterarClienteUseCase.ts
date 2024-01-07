import {ClienteAlterarDto, ClienteRetornoDto} from "../dtos";

export const IAlterarClienteUseCase: unique symbol = Symbol("IAlterarClienteUseCase");
export interface IAlterarClienteUseCase {
    alterar(requestDto: ClienteAlterarDto): Promise<ClienteRetornoDto>;
}