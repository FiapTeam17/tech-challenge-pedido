import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Put } from '@nestjs/common';
import { ProdutoAlterarDto, ProdutoCriarDto, ProdutoRetornoDto } from '../dtos';
import { DATA_SOURCE } from '../../common/constants';
import { DataSource } from 'typeorm';
import { ProdutoService } from '../services';

@Controller("/produtos")
export class ProdutoController {

  private produtoService: ProdutoService;
  private readonly logger = new Logger(ProdutoController.name);

  constructor(
    @Inject(DATA_SOURCE) private dataSource: DataSource
  ) {
    this.produtoService = new ProdutoService(this.dataSource, this.logger);
  }

  @Get("/categoria/:categoria")
  async obterPorCategoria(@Param("categoria") categoria: string): Promise<ProdutoRetornoDto[]> {    
    return await this.produtoService.obterPorCategoria(categoria);
  }

  @Get("/:id")
  async obter(@Param("id") id: number): Promise<ProdutoRetornoDto> {
    return await this.produtoService.obterPorId(id);
  }

  @Post("")
  async criar(@Body() produtoDto: ProdutoCriarDto): Promise<ProdutoRetornoDto> {
    return await this.produtoService.criar(produtoDto);
  }

  @Put("/:id")
  async alterar(@Param("id") id: number, @Body() produtoDto: ProdutoAlterarDto): Promise<ProdutoRetornoDto> {
    produtoDto.id = id;
    return await this.produtoService.alterar(produtoDto);
  }

  @Delete("/:id")
  async excluir(@Param("id") id: number): Promise<void> {
    return await this.produtoService.excluir(id);
  }
}
