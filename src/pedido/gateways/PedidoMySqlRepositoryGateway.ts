import { DataSource, Repository } from 'typeorm';
import { IPedidoRepositoryGateway } from "../interfaces";
import { PedidoModel } from './models';
import { PedidoItemModel } from './models';
import { InternalServerErrorException, Logger, NotImplementedException } from '@nestjs/common';
import { PedidoDto } from '../dtos';
import { PedidoStatusEnum, StatusPedidoEnumMapper } from '../types';

export class PedidoMySqlRepositoryGateway implements IPedidoRepositoryGateway {

  private pedidoRepository: Repository<PedidoModel>;
  // private pagamentoRepository: Repository<PagamentoModel>;
  private pedidoItemRepository: Repository<PedidoItemModel>;

  constructor(
    private dataSource: DataSource,
    private logger: Logger
  ) {
    this.pedidoRepository = this.dataSource.getRepository(PedidoModel);
    this.pedidoItemRepository = this.dataSource.getRepository(PedidoItemModel);
    // this.pagamentoRepository = this.dataSource.getRepository(PagamentoModel);
  }

  async criar(pedido: PedidoDto): Promise<number | undefined> {
    try {      
      //TODO adicionar controle de transação
      const pedidoEntity = new PedidoModel(pedido);
      const pedidoEntityCreated = await this.pedidoRepository.save(pedidoEntity);
      const pedidoCreatedId = pedidoEntityCreated.id;

      if (pedidoEntity.itens) {
        for (let i = 0; i < pedidoEntity.itens.length; i++) {
          const item = pedidoEntity.itens[i];
          item.pedido = pedidoEntityCreated;
          await this.pedidoItemRepository.save(item);
        }
      }
      
      return pedidoCreatedId;

    } catch (e) {

      this.logger.error(e);
      throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
    }
  }

  async atualizarStatus(pedido: PedidoDto): Promise<void> {
    try {      
      const pedidoId = pedido.id as number;
      await this.pedidoRepository.update(pedidoId, {
        status: StatusPedidoEnumMapper.enumParaNumber(pedido.status)
      });      
    }
    catch (e) {

      this.logger.error(e);
      throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
    }
  }

  async obterEmAndamento(): Promise<PedidoDto[]> {
    try {      
      const pedidos: PedidoDto[] = [];

      const pedidoEntity = await this.pedidoRepository
        .createQueryBuilder("ped")
        .where("ped.status in(:...status)", {
          status: [
            StatusPedidoEnumMapper.enumParaNumber(PedidoStatusEnum.RECEBIDO),
            StatusPedidoEnumMapper.enumParaNumber(PedidoStatusEnum.EM_PREPARACAO),
            StatusPedidoEnumMapper.enumParaNumber(PedidoStatusEnum.PRONTO)
          ]
        })
        .getMany();

      pedidoEntity.forEach(pe => {
        pedidos.push(pe.getDto());
      });

      return pedidos;
    }
    catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
    }
  }

  async obterPorId(pedidoId: number): Promise<PedidoDto> {
    try {
      const pedidoEntity = await this.pedidoRepository
        .createQueryBuilder("ped")
        .where("ped.Id = :id", {
          id: pedidoId
        })
        .leftJoinAndSelect('ped.cliente', 'cli')
        .leftJoinAndSelect('ped.itens', 'item')
        .leftJoinAndSelect('item.produto', 'prod')
        .leftJoinAndSelect('item.pedido', 'peditem')
        .getOne();
      return pedidoEntity?.getDto();
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
    }
  }

  async obterPorStatusAndIdentificadorPagamento(status: PedidoStatusEnum, identificadorPagamento: string): Promise<PedidoDto[]> {
    try {
      const pedidos: PedidoDto[] = [];

      //TODO: implementar filtro de "identificadorPagamento"

      const pedidoEntity = await this.pedidoRepository
        .createQueryBuilder("ped")
        .where("ped.status = :status", {
          status: StatusPedidoEnumMapper.enumParaString(status)
        }).getMany();

      pedidoEntity.forEach(pe => {
        pedidos.push(pe.getDto());
      })

      return pedidos;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
    }
  }

  async obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<PedidoDto> {
    throw new NotImplementedException();
    // TODO: integração
    // try {

      // const pagamento = await this.pagamentoRepository.findOneBy({
      //   codigoPagamento: identificadorPagamento
      // });
      //
      // let pedidoOp: PedidoDto;
      // if (pagamento !== null && pagamento.pedido !== undefined) {
      //   const pedidoEntity = pagamento.pedido;
      //   pedidoOp = pedidoEntity?.getDto();
      // }
      //
      // return pedidoOp;
    // }
    // catch (e) {
    //   this.logger.error(e);
    //   throw new InternalServerErrorException("Não foi possível se conectar ao banco de dados!");
    // }
  }
}
