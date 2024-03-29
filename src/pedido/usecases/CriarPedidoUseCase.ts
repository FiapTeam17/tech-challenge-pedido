import { ICriarPedidoUseCase, IPedidoRepositoryGateway } from '../interfaces';
import { IObterProdutoUseCase } from '../../produto/interfaces';
import { IObterClienteUseCase } from '../../cliente/interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoCriarDto } from '../dtos';
import { PedidoCriarRetornoDto } from '../dtos/PedidoCriarRetornoDto';
import { PedidoEntity, PedidoItemEntity } from '../entities';
import { ClienteEntity } from '../../cliente/entities';
import { ProdutoEntity } from '../../produto/entities';
import { PedidoStatusEnum } from '../types';
import { ISqsGateway } from '../interfaces/ISqsGateway';

export class CriarPedidoUseCase implements ICriarPedidoUseCase {

    private sqsUrl: string;

    constructor(
        private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        private obterProdutoUseCase: IObterProdutoUseCase,
        private obterClienteUseCase: IObterClienteUseCase,
        private readonly sqsGateway: ISqsGateway,
        private logger: Logger
    ) {
        this.sqsUrl = process.env.QUEUE_URL || "https://sqs.us-east-2.amazonaws.com/258775715661/";
    }

    async criar(pedidoDto: PedidoCriarDto): Promise<PedidoCriarRetornoDto> {
        //TODO adicionar mapper
        const pedido = this.dtoToDomain(pedidoDto);

        await this.verificaRemoveClienteInexistente(pedido);
        await this.verificaExistenciaProduto(pedido);

        pedido.dataCadastro = new Date(Date.now());
        pedido.setStatus(PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO);

        const id = await this.pedidoRepositoryGateway.criar(pedido.toPedidoDto());
        if (id !== undefined) {
            pedido.id = id;
        }

        const filaPagamento: any = {

            identificador: pedido.id.toString(),
            valor: pedido.valorTotal,
        };

        await this.sqsGateway.sendMessage(`Pedido${pedido.id}`, this.sqsUrl.concat("pedido-to-pagamento.fifo"), filaPagamento);

        const respPedidoDto = pedido.toPedidoDto();

        const resp: PedidoCriarRetornoDto = { ...respPedidoDto, qrCodeMercadoPago: undefined, itens: [] };

        for (let i = 0; i < respPedidoDto.itens!.length; i++) {
            resp.itens.push({ ...respPedidoDto.itens![i] });
        }

        return resp;
    }

    private async verificaRemoveClienteInexistente(pedido: PedidoEntity) {
        const clienteId = pedido.cliente?.id;
        if (clienteId !== undefined) {
            const cliOp = await this.obterClienteUseCase.obterPorId(clienteId);
            if (cliOp == undefined) {
                pedido.removerCliente();
            }
        }
    }

    private async verificaExistenciaProduto(pedido: PedidoEntity) {

        if (pedido.itens === undefined || pedido.itens.length === 0) {
            throw new BadRequestException("Produto não encontrado!");
        }

        for (let i = 0; i < pedido.itens.length; ++i) {
            const item = pedido.itens[i];
            const produto = item.produto;

            if (produto === undefined) {
                throw new BadRequestException("Produto não encontrado!");
            }

            if (item.quantidade === undefined) {
                throw new BadRequestException("A quantidade deve ser informada!");
            }

            if (item.quantidade <= 0) {
                throw new BadRequestException("A quantidade deve ser maior que zero!");
            }

            const produtoOp = await this.obterProdutoUseCase.obterPorId(produto.id as never);
            if (produtoOp == undefined) {
                throw new BadRequestException("Produto não encontrado!");
            }

            item.valorUnitario = produtoOp.valor as never;
        }

    }

    private dtoToDomain(pedidoDto: PedidoCriarDto): PedidoEntity {
        let cliente = undefined;
        if (pedidoDto.clienteId) {
            cliente = new ClienteEntity(pedidoDto.clienteId);
        }

        const pedido = new PedidoEntity(undefined, cliente, pedidoDto.observacao);

        pedido.itens = pedidoDto.itens?.map(i => {
            return new PedidoItemEntity(undefined, pedido,
                new ProdutoEntity(i.produtoId),
                i.quantidade);
        });

        return pedido;
    }
}
