import {IClienteRepositoryGateway} from "../interfaces";
import {ClienteModel} from "./models";
import {ClienteAlterarDto, ClienteDto, ClienteRetornoDto} from "../dtos";
import {InternalServerErrorException, Logger} from "@nestjs/common";
import {DataSource, In, Repository} from "typeorm";

class ErrorToAccessDatabaseException implements Error {
    message: string;
    name: string;
}

export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway {

    private clienteRepository: Repository<ClienteModel>;

    constructor(
      private dataSource: DataSource,
      private logger: Logger
    ) {
        this.clienteRepository = this.dataSource.getRepository(ClienteModel);
    }

    async alterar(dto: ClienteAlterarDto): Promise<ClienteRetornoDto> {
        try {
            const clienteModel = await this.clienteRepository.save(new ClienteModel(dto));
            return clienteModel.getClientDto();

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async criar(dto: ClienteDto): Promise<ClienteRetornoDto> {
        try {
            const clienteModel = await this.clienteRepository.save(new ClienteModel(dto));
            return clienteModel.getClientDto();
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorCpf(cpf: string): Promise<ClienteDto> {
        try {
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    cpf: In([cpf])
                });
            return clienteEntity?.getClientDto();
        } catch (e) {
            this.logger.error(e);
            throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
        }
    }

    async obterPorEmail(email: string): Promise<ClienteDto> {
        try {
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    email: In([email])
                });
            return clienteEntity?.getClientDto();
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorId(id: number): Promise<ClienteDto> {
        try {
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    id: In([id])
                });

            return clienteEntity?.getClientDto()
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }
}