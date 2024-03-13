import { BadRequestException, Body, Controller, Get, Inject, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { PedidoService } from '../services';
import { DATA_SOURCE } from '../../common/constants';
import { DataSource } from 'typeorm';
import { PedidoCriarDto, PedidoPagamentoDto, PedidoRetornoDto, PedidoStatusDto } from '../dtos';
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

    @Get("/:id")
    async obterPorId(@Param("id") id: number): Promise<PedidoRetornoDto> {
        return await this.pedidoService.obterPorId(id);
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

    //Criar nova rota para receber status de pagamento
    @Patch("/:identificador/:statusPagamento")
    async atualizarStatusPagamento(@Param("id") identificador: number, statusPagamento: string): Promise<void> {
        if (statusPagamento === undefined) {
            throw new BadRequestException("Status deve ser informado");
        }
        await this.pedidoService.atualizarStatusPagamento(identificador, statusPagamento);
    }
}
