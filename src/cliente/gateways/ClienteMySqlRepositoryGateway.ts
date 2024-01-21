import { IClienteRepositoryGateway } from '../interfaces';
import { ClienteModel } from './models';
import { ClienteAlterarDto, ClienteDto, ClienteRetornoDto } from '../dtos';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway {

    private clienteRepository: Repository<ClienteModel>;

    constructor(
      private dataSource: DataSource,
      private logger: Logger
    ) {
        this.clienteRepository = this.dataSource.getRepository(ClienteModel);
    }

    async alterar(dto: ClienteAlterarDto): Promise<ClienteRetornoDto> {

        const clienteModel = new ClienteModel(dto);
        const result= await this.clienteRepository.update(dto.id, clienteModel);
        if(result.affected !== 1){
            throw new InternalServerErrorException("Erro ao atualizar os dados");
        }

        return clienteModel.getClientDto();
    }

    async criar(dto: ClienteDto): Promise<ClienteRetornoDto> {

        const clienteModel = await this.clienteRepository.save(new ClienteModel(dto));
        return clienteModel.getClientDto();
    }

    async obterPorCpf(cpf: string): Promise<ClienteDto> {

        const clienteEntity = await this.clienteRepository.findOneBy(
          {
              cpf: In([cpf])
          });
        return clienteEntity?.getClientDto();
    }

    async obterPorEmail(email: string): Promise<ClienteDto> {

        const clienteEntity = await this.clienteRepository.findOneBy(
          {
              email: In([email])
          });
        return clienteEntity?.getClientDto();
    }

    async obterPorId(id: number): Promise<ClienteDto> {

        const clienteEntity = await this.clienteRepository.findOneBy(
          {
              id: In([id])
          });

        return clienteEntity?.getClientDto();
    }
}
