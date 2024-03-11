import {Body, Controller, Get, Inject, Logger, Param, Patch, Post, Put} from "@nestjs/common";
import {DataSource} from "typeorm";
import {DATA_SOURCE} from "../../common/constants";
import {ClienteService} from "../services";
import {ClienteAlterarDto, ClienteCriarDto} from "../dtos";
import { ClienteAlterarStatusDto } from "../dtos/ClienteAlterarStatusDto";

@Controller("/clientes")
export class ClienteController {

  private clienteService: ClienteService
  private readonly logger = new Logger(ClienteController.name);
  constructor(
      @Inject(DATA_SOURCE) private dataSource: DataSource
  ) {
    this.clienteService = new ClienteService(this.dataSource, this.logger);
  }

  @Get("/cpf/:cpf")
  async obterPorCpf(@Param("cpf") cpf: string) {
    return await this.clienteService.obterPorCpf(cpf);
  }

  @Get("/email/:email")
  async obterPorEmail(@Param("email") email: string) {
    return await this.clienteService.obterPorEmail(email);
  }

  @Get("/:id")
  async obterPorId(@Param("id") id: number) {
    return await this.clienteService.obterPorId(id);
  }

  @Post("/")
  async criarCliente(@Body() clienteDto: ClienteCriarDto) {
    return await this.clienteService.criar(clienteDto);
  }

  @Put("/:id")
  async alterarCliente(@Body() clienteDto: ClienteAlterarDto, @Param("id") id: number){
    clienteDto.id = id;
    return await this.clienteService.alterar(clienteDto);
  }

  @Patch("/inativar")
  async inativarCliente(@Body() clienteDto: ClienteAlterarStatusDto){
    return await this.clienteService.inativarCliente(clienteDto);
  }

  @Patch("/excluir")
  async excluirCliente(@Body() clienteDto: ClienteAlterarStatusDto){
    return await this.clienteService.excluirCliente(clienteDto);
  }
}
