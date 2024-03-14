export class PedidoProducaoItemDto {
  public quantidade?: number;
  public produtoId?: number;
  public nomeProduto: string;
}

export class PedidoProducaoDto {
  public observacao?: string;
  public identificacao?: string;
  public numero?: number;
  public itens: PedidoProducaoItemDto[] = [];
}
