import { DataSource, Repository } from 'typeorm';
import { IPedidoRepositoryGateway } from '../interfaces';
import { PedidoItemModel, PedidoModel, PedidoPagamentoModel } from './models';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { PedidoDto } from '../dtos';
import { StatusPedidoEnumMapper } from '../types';

export class PedidoMySqlRepositoryGateway implements IPedidoRepositoryGateway {

  private pedidoRepository: Repository<PedidoModel>;
  private pedidoPagamentoRepository: Repository<PedidoPagamentoModel>;
  private pedidoItemRepository: Repository<PedidoItemModel>;

  constructor(
    private dataSource: DataSource,
    private logger: Logger
  ) {
    this.pedidoRepository = this.dataSource.getRepository(PedidoModel);
    this.pedidoItemRepository = this.dataSource.getRepository(PedidoItemModel);
    this.pedidoPagamentoRepository = this.dataSource.getRepository(PedidoPagamentoModel);
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
}
