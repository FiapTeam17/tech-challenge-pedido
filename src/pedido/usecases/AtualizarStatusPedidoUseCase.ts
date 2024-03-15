import { IAtualizarStatusPedidoUseCase, IPedidoRepositoryGateway } from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoStatusEnum, StatusPedidoEnumMapper, StatusPagamentoEnum } from '../types';
import { PedidoDto } from '../dtos';
import { PedidoEntity } from '../entities';
import { ISqsGateway } from '../interfaces/ISqsGateway';
import { PedidoProducaoDto, PedidoProducaoItemDto } from '../dtos/producao/PedidoProducaoDto';

export class AtualizarStatusPedidoUseCase implements IAtualizarStatusPedidoUseCase {

    private sqsUrl: string;

    constructor(
        private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        private readonly sqsGateway: ISqsGateway,
        private logger: Logger
    ) {
        this.sqsUrl = process.env.QUEUE_URL || "https://sqs.us-east-2.amazonaws.com/258775715661/";
    }

    async atualizarStatus(pedidoId: number, status: PedidoStatusEnum): Promise<void> {
        const pedidoDto: PedidoDto = await this.pedidoRepositoryGateway.obterPorId(pedidoId);
        if (pedidoDto === undefined) {
            throw new BadRequestException("Pedido não encontrado!");
        }

        const pedido = PedidoEntity.getInstance(pedidoDto);
        pedido.setStatus(status);

        await this.pedidoRepositoryGateway.atualizarStatus(pedido.toPedidoDto());
    }

    async atualizarStatusPagamento(identificador: number, status: StatusPagamentoEnum): Promise<void> {
        const pedidoDto: PedidoDto = await this.pedidoRepositoryGateway.obterPorId(identificador);
        if (pedidoDto === undefined) {
            throw new BadRequestException("Produto não encontrado!");
        }

        if (status === StatusPagamentoEnum.PAGO) {
            const pedido = PedidoEntity.getInstance(pedidoDto);
            pedido.setStatus(PedidoStatusEnum.RECEBIDO);

            await this.pedidoRepositoryGateway.atualizarStatus(pedido.toPedidoDto());

            let pedidoProducao = new PedidoProducaoDto();
            pedidoProducao.identificacaoPedido = pedidoDto.id;
            pedidoProducao.identificacaoCliente = pedidoDto.cliente != undefined ? pedidoDto.cliente.nome : pedidoDto.id.toString();
            pedidoProducao.observacao = pedidoDto.observacao;

            pedidoDto.itens.forEach(item => {
                let itemProducao = new PedidoProducaoItemDto();
                itemProducao.nomeProduto = item.produto.nome;
                itemProducao.produtoId = item.produto.id;
                itemProducao.quantidade = item.quantidade;
                pedidoProducao.itens.push(itemProducao);
            });

            await this.sqsGateway.sendMessage(`Pedido${identificador}`,
                this.sqsUrl.concat("pedido-to-producao-criar-pedido.fifo"), pedidoProducao);
        }
        else if (status === StatusPagamentoEnum.CANCELADO || status === StatusPagamentoEnum.ERRO) {
            await this.atualizarStatus(identificador, PedidoStatusEnum.PROBLEMA_DE_PAGAMENTO)
        }
    }
}
