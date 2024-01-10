import { BadRequestException, Body, Controller, Get, Inject, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { PedidoService } from '../services';
import { DATA_SOURCE } from '../../common/constants';
import { DataSource } from 'typeorm';
import { PedidoCriarDto, PedidoEmAndamentoDto, PedidoPagamentoDto, PedidoRetornoDto, PedidoStatusDto } from '../dtos';
import { PedidoCriarRetornoDto } from '../dtos/PedidoCriarRetornoDto';
import { StatusPedidoEnumMapper } from '../types';

@Controller("/pedidos")
export class PedidoController {

    private pedidoService: PedidoService;
    private readonly logger = new Logger(PedidoController.name);
    constructor(
      @Inject(DATA_SOURCE) private dataSource: DataSource
    ) {
        this.pedidoService = new PedidoService(this.dataSource, this.logger);
    }

    @Get("/andamento")    
    async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {

        return await this.pedidoService.obterEmAndamento();
    }

    @Get("/:id")    
    async obterPorId(@Param("id") id: number): Promise<PedidoRetornoDto> {        
        const pedido = await this.pedidoService.obterPorId(id);        
        return pedido;
    }

    @Post("")    
    async criar(@Body() pedidoDto: PedidoCriarDto): Promise<PedidoCriarRetornoDto> {
        return await this.pedidoService.criar(pedidoDto);
    }

    @Patch("/:id/status")
    async atualizarStatus(@Param("id") id: number, @Body() pedidoDto: PedidoStatusDto): Promise<void> {
        if (pedidoDto.status === undefined) {
            throw new BadRequestException("Status deve ser informado");
        }
        await this.pedidoService.atualizarStatus(id, StatusPedidoEnumMapper.stringParaEnum(pedidoDto.status as unknown as string));
    }

    @Get()
    async obterPedidosPorStatus(
        @Query("status") status: string,
        @Query("identificadorPagamento") identificadorPagamento: string): Promise<PedidoRetornoDto[]> {

        return await this.pedidoService.obterPorStatusAndIdentificadorPagamento(status, identificadorPagamento);
    }

    @Get("/pagamentos/:idPagamento")
    async obterPedidosPorIdentificadorPagamento(@Param("idPagamento") idPagamento: string): Promise<PedidoRetornoDto> {

        return await this.pedidoService.obterPorIdentificadorPagamento(idPagamento);
    }

    @Get("/:idPedido/statusPagamento")
    async consultarPagamentos(@Param("idPedido") idPedido: number): Promise<PedidoPagamentoDto> {
        return await this.pedidoService.consultaStatusPagamento(idPedido);
    }
}
