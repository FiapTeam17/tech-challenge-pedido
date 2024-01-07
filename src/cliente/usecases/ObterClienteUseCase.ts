import {IClienteRepositoryGateway, IObterClienteUseCase} from "../interfaces";
import {BadRequestException, Logger} from "@nestjs/common";
import {ClienteDto, ClienteRetornoDto} from "../dtos";

export class ObterClienteUseCase implements  IObterClienteUseCase{
    constructor(
        private clienteRepositoryGateway: IClienteRepositoryGateway,
        private logger: Logger
    ){}

    async obterPorId(id: number): Promise<ClienteRetornoDto> {
        const clienteOp = await this.clienteRepositoryGateway.obterPorId(id);
        return this.getClienteDto(clienteOp);
    }

    async obterPorCpf(cpf: string): Promise<ClienteRetornoDto> {
        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(cpf);
        return this.getClienteDto(clienteOp);
    }

    async obterPorEmail(email: string): Promise<ClienteRetornoDto> {
        const clienteOp = await this.clienteRepositoryGateway.obterPorEmail(email);
        return this.getClienteDto(clienteOp);
    }

    private getClienteDto(clienteOp: ClienteDto): ClienteRetornoDto {
        if (clienteOp == null) {
            throw new BadRequestException("Cliente não  encontrado!");
        }

        return clienteOp;
    }

}