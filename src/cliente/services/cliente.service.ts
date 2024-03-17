import {
  IAlterarClienteUseCase,
  IClienteRepositoryGateway,
  ICriarClienteUseCase,
  IObterClienteUseCase
} from "../interfaces";
import {DataSource} from "typeorm";
import {Logger} from "@nestjs/common";
import {ClienteMySqlRepositoryGateway} from "../gateways";
import {AlterarClienteUseCase, CriarClienteUseCase, ObterClienteUseCase} from "../usecases";
import {ClienteAlterarDto, ClienteCriarDto, ClienteRetornoDto} from "../dtos";
import { ClienteAlterarStatusDto } from "../dtos/ClienteAlterarStatusDto";
import { IAlterarStatusClienteUseCase } from "../interfaces/IAlterarStatusClienteUseCase";
import { AlterarStatusClienteUseCase } from "../usecases/AlterarStatusClienteUseCase";

export class ClienteService {
  private readonly clienteRepositoryGateway: IClienteRepositoryGateway;
  private readonly obterClienteUseCase: IObterClienteUseCase;
  private readonly criarClienteUseCase: ICriarClienteUseCase;
  private readonly alterarClienteUseCase: IAlterarClienteUseCase;
  private readonly alterarStatusClienteUseCase: IAlterarStatusClienteUseCase;

  constructor(
      private dataSource: DataSource,
      private logger: Logger
  ) {
    this.clienteRepositoryGateway = new ClienteMySqlRepositoryGateway(dataSource, logger);
    this.obterClienteUseCase = new ObterClienteUseCase(this.clienteRepositoryGateway, logger);
    this.criarClienteUseCase = new CriarClienteUseCase(this.clienteRepositoryGateway, logger);
    this.alterarClienteUseCase = new AlterarClienteUseCase(this.clienteRepositoryGateway, logger);
    this.alterarStatusClienteUseCase = new AlterarStatusClienteUseCase(this.clienteRepositoryGateway, this.obterClienteUseCase, logger)
  }

  async obterPorId(id: number): Promise<ClienteRetornoDto>{
    return await this.obterClienteUseCase.obterPorId(id);
  }

  async obterPorCpf(cpf: string): Promise<ClienteRetornoDto>{
    return await this.obterClienteUseCase.obterPorCpf(cpf);
  }

  async obterPorEmail(email: string): Promise<ClienteRetornoDto>{
    return await this.obterClienteUseCase.obterPorEmail(email);
  }

  async criar(dto: ClienteCriarDto): Promise<ClienteRetornoDto>{
    return await this.criarClienteUseCase.criar(dto);
  }

  async alterar(requestDto: ClienteAlterarDto): Promise<ClienteRetornoDto>{
    return await this.alterarClienteUseCase.alterar(requestDto);
  }

  async inativarCliente(dto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
    return await this.alterarStatusClienteUseCase.inativarCliente(dto);
  }

  async excluirCliente(dto: ClienteAlterarStatusDto): Promise<ClienteRetornoDto> {
    return await this.alterarStatusClienteUseCase.excluirCliente(dto);
  }
}