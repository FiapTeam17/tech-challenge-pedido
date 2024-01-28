import { IExcluirProdutoUseCase, IProdutoRepositoryGateway } from '../interfaces';
import { Logger } from '@nestjs/common';

export class ExcluirProdutoUseCase implements IExcluirProdutoUseCase{
    constructor(
        private produtoRepositoryGateway: IProdutoRepositoryGateway,
        private logger: Logger,
    ) { }

    public async excluir(id: number): Promise<void> {

        await this.verificaSeProdutoEstaAssociadoItem(id);
        await this.produtoRepositoryGateway.excluir(id);
    }

    //TODO: este método deveria chamar o service de Pedido
    private async verificaSeProdutoEstaAssociadoItem(id: number) {
        // const existePedido = await this.produtoRepositoryGateway.existePedidoByProdutoId(id);
        // if (existePedido) {
        //     this.logger.warn("Product is associated with at least 1 order");
        //     throw new ExclusaoProdutoAssociadoPedidoException();
        // }
    }
}
