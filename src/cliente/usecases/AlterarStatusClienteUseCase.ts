import { Logger, NotFoundException } from "@nestjs/common";
import { ClienteRetornoDto } from "../dtos";
import { ClienteAlterarStatusDto } from "../dtos/ClienteAlterarStatusDto";
import { IClienteRepositoryGateway, IObterClienteUseCase } from "../interfaces";
import { IAlterarStatusClienteUseCase } from "../interfaces/IAlterarStatusClienteUseCase";

export class AlterarStatusClienteUseCase implements IAlterarStatusClienteUseCase {

    constructor(private clienteRepositoryGateway: IClienteRepositoryGateway,
        private obterClienteUseCase: IObterClienteUseCase,
        private logger: Logger) { }

    ativarCliente(cliente: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
        throw new Error("Method not implemented.");
    }

    async inativarCliente(inativarClienteDto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
        const cliente = await this.obterClienteUseCase.obterPorCpf(inativarClienteDto.cpf)
        if (!cliente) {
            throw new NotFoundException("Nenhum cliente possui o CPF informado.")
        }
        return this.clienteRepositoryGateway.inativar(inativarClienteDto);
    }

    async excluirCliente(excluirClienteDto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
        const cliente = await this.obterClienteUseCase.obterPorCpf(excluirClienteDto.cpf)
        if (!cliente) {
            throw new NotFoundException("Nenhum cliente possui o CPF informado.")
        }
        return this.clienteRepositoryGateway.inativar(excluirClienteDto);
    }

    reativarCadastroCliente(cliente: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
        throw new Error("Method not implemented.");
    }

}