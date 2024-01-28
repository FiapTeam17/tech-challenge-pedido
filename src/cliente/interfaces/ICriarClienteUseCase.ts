import {ClienteCriarDto, ClienteRetornoDto} from "../dtos";

export const ICriarClienteUseCase: unique symbol = Symbol("ICriarClienteUseCase");

export interface ICriarClienteUseCase {
    criar(dto: ClienteCriarDto): Promise<ClienteRetornoDto>;
}