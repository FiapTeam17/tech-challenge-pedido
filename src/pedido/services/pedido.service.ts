import {
  IAtualizarStatusPedidoUseCase,
  ICriarPedidoUseCase,
  IObterPedidoUseCase,
  IPedidoRepositoryGateway,
} from '../interfaces';
import { IClienteRepositoryGateway, IObterClienteUseCase } from '../../cliente/interfaces';
import { IObterProdutoUseCase, IProdutoRepositoryGateway } from '../../produto/interfaces';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ClienteMySqlRepositoryGateway } from '../../cliente/gateways';
import { ObterClienteUseCase } from '../../cliente/usecases';
import { ProdutoMySqlRepositoryGateway } from '../../produto/gateways';
import { ObterProdutoUseCase } from '../../produto/usecases';
import { PedidoMySqlRepositoryGateway } from '../gateways';
import { AtualizarStatusPedidoUseCase, CriarPedidoUseCase } from '../usecases';
import { PedidoCriarDto, PedidoRetornoDto } from '../dtos';
import { PedidoCriarRetornoDto } from '../dtos/PedidoCriarRetornoDto';
import { PedidoStatusEnum } from '../types';

export class PedidoService {

  private readonly pedidoRepositoryGateway: IPedidoRepositoryGateway;
  private readonly obterPedidoUseCase: IObterPedidoUseCase;
  private readonly criarPedidoUseCase: ICriarPedidoUseCase;
  private readonly atualizarStatusPedidoUseCase: IAtualizarStatusPedidoUseCase;

  private readonly clienteRepositoryGateway: IClienteRepositoryGateway;
  private readonly obterClienteUseCase: IObterClienteUseCase;

  private readonly produtoRepositoryGateway: IProdutoRepositoryGateway;
  private readonly obterProdutoUseCase: IObterProdutoUseCase;

  // private readonly pagamentoRepositoryGateway: IPagamentoRepositoryGateway;
  // private readonly obterPagamentoUseCase: IObterPagamentoUseCase;
  // private readonly gerarQrCodeMpUseCase: IGerarQrCodeMpUseCase;
  // private readonly criarPagamentoUseCase: ICriarPagamentoUseCase;
  // private readonly definirQrCodePagamentoUseCase: IDefinirQrCodePagamentoUseCase;

  // private readonly pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway;

  constructor(
    private dataSource: DataSource,
    private logger: Logger
  ) {
    this.clienteRepositoryGateway = new ClienteMySqlRepositoryGateway(dataSource, logger);
    this.obterClienteUseCase = new ObterClienteUseCase(this.clienteRepositoryGateway, logger);

    this.produtoRepositoryGateway = new ProdutoMySqlRepositoryGateway(dataSource, logger);
    this.obterProdutoUseCase = new ObterProdutoUseCase(this.produtoRepositoryGateway, logger);

    // this.pagamentoRepositoryGateway = new PagamentoMySqlRepositoryGateway(this.dataSource, this.logger);
    // this.obterPagamentoUseCase = new ObterPagamentoUseCase(this.pagamentoRepositoryGateway, this.logger);
    // this.pagamentoMpServiceHttpGateway = new PagamentoMockServiceHttpGateway(this.logger);
    // this.gerarQrCodeMpUseCase = new GerarQrCodeMpUseCase(this.pagamentoMpServiceHttpGateway, this.logger);
    // this.criarPagamentoUseCase = new CriarPagamentoUseCase(this.pagamentoRepositoryGateway, this.logger);
    // this.definirQrCodePagamentoUseCase = new DefinirQrCodePagamentoUseCase(this.pagamentoRepositoryGateway, this.logger);

    this.pedidoRepositoryGateway = new PedidoMySqlRepositoryGateway(dataSource, logger);
    // this.obterPedidoUseCase = new ObterPedidoUseCase(this.pedidoRepositoryGateway, this.obterPagamentoUseCase, logger);
    this.criarPedidoUseCase = new CriarPedidoUseCase(this.pedidoRepositoryGateway,
       this.obterProdutoUseCase, this.obterClienteUseCase,logger);
      // new CriarPedidoUseCase(this.pedidoRepositoryGateway,
      // this.obterProdutoUseCase, this.obterClienteUseCase, this.gerarQrCodeMpUseCase,
      // this.criarPagamentoUseCase, this.definirQrCodePagamentoUseCase, logger);
    this.atualizarStatusPedidoUseCase = new AtualizarStatusPedidoUseCase(this.pedidoRepositoryGateway, logger);
  }

  async obterPorId(id: number): Promise<PedidoRetornoDto> {
    return await this.obterPedidoUseCase.obterPorId(id);
  }

  async criar(pedido: PedidoCriarDto): Promise<PedidoCriarRetornoDto> {
    return await this.criarPedidoUseCase.criar(pedido);
  }

  async atualizarStatus(pedidoId: number, status: PedidoStatusEnum): Promise<void> {
    return await this.atualizarStatusPedidoUseCase.atualizarStatus(pedidoId, status);
  }
}
