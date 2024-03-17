export class PedidoProducaoItemDto {
  public quantidade?: number;
  public produtoId?: number;
  public nomeProduto: string;
}

export class PedidoProducaoDto {
  public observacao?: string;
  public identificacaoPedido?: number;
  public identificacaoCliente?: string;
  public itens: PedidoProducaoItemDto[] = [];
}
