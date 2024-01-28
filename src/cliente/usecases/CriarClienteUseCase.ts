import {IClienteRepositoryGateway, ICriarClienteUseCase} from "../interfaces";
import {ClienteCriarDto, ClienteRetornoDto} from "../dtos";
import {BadRequestException, Logger} from "@nestjs/common";
import {ClienteEntity} from "../entities";

export class CriarClienteUseCase implements ICriarClienteUseCase{

    constructor( 
        private clienteRepositoryGateway: IClienteRepositoryGateway,
        private logger: Logger  ){}
    async criar(dto: ClienteCriarDto): Promise<ClienteRetornoDto> {

        const clienteReq = this.mapDtoToDomain(dto);

        clienteReq.validar();

        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(<string>clienteReq.cpf);

        if (clienteOp !== undefined) {

            throw new BadRequestException("Cliente já cadastrado");
        }

        return await this.clienteRepositoryGateway.criar(dto);
    }

    private mapDtoToDomain(dto: ClienteCriarDto): ClienteEntity {
        return new ClienteEntity(undefined, dto.nome, dto.cpf, dto.email);
    }

}