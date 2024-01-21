import { IAlterarClienteUseCase, IClienteRepositoryGateway } from '../interfaces';
import { ClienteAlterarDto, ClienteRetornoDto } from '../dtos';
import { ClienteEntity } from '../entities';
import { BadRequestException, Logger } from '@nestjs/common';

export class AlterarClienteUseCase implements IAlterarClienteUseCase{

    constructor(
      private clienteRepositoryGateway: IClienteRepositoryGateway,
      private logger: Logger
    ){}

    async alterar(paramsDto: ClienteAlterarDto): Promise<ClienteRetornoDto> {

        const clienteRetornoDto = await this.clienteRepositoryGateway.obterPorId(paramsDto.id);
        if(!clienteRetornoDto){
            throw new BadRequestException("");
        }

        const cliente = this.mapDtoToDomain(paramsDto);
        cliente.validar();

        return await this.clienteRepositoryGateway.alterar(paramsDto);
    }

    private mapDtoToDomain(dto: ClienteAlterarDto): ClienteEntity {
        return new ClienteEntity(dto.id, dto.nome, dto.cpf, dto.email);
    }
}
