import { IClienteRepositoryGateway } from '../interfaces';
import { ClienteModel } from './models';
import { ClienteAlterarDto, ClienteDto, ClienteRetornoDto } from '../dtos';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { ClienteAlterarStatusDto } from '../dtos/ClienteAlterarStatusDto';

export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway {

    private clienteRepository: Repository<ClienteModel>;

    constructor(
      private dataSource: DataSource,
      private logger: Logger
    ) {
        this.clienteRepository = this.dataSource.getRepository(ClienteModel);
    }

    async inativar(dto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
        const result = await this.clienteRepository.query("UPDATE Cliente SET inativo = 1 WHERE Cliente.email = ? OR Cliente.cpf = ?", [dto.email, dto.cpf])
        return result.getClientDto();
    }
    async excluir(dto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
        const result = await this.clienteRepository.query("UPDATE Cliente SET excluido = 1 WHERE Cliente.email = ? OR Cliente.cpf = ?", [dto.email, dto.cpf])
        return result.getClientDto();
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

    async obterPorCpf(cpf: string): Promise<ClienteRetornoDto> {

        const clienteEntity = await this.clienteRepository.findOneBy(
          {
              cpf: In([cpf])
          });
        return clienteEntity?.getClientDto();
    }

    async obterPorEmail(email: string): Promise<ClienteRetornoDto> {

        const clienteEntity = await this.clienteRepository.findOneBy(
          {
              email: In([email])
          });
        return clienteEntity?.getClientDto();
    }

    async obterPorId(id: number): Promise<ClienteRetornoDto> {

        const clienteEntity = await this.clienteRepository.findOneBy(
          {
              id: In([id])
          });

        return clienteEntity?.getClientDto();
    }
}
