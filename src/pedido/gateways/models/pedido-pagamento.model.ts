import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PedidoModel } from './pedido.model';
import { PedidoPagamentoDto } from '../../dtos';

@Entity("PedidoPagamento")
export class PedidoPagamentoModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  pagamentoId: number;

  @Column({
    nullable: false
  })
  foiAprovado: boolean;

  @ManyToOne(() => PedidoModel, (pedido) => pedido.pagamentos, { nullable: false })
  pedido: PedidoModel;

  constructor(pagamento?: PedidoPagamentoDto, pedidoEntity?: PedidoModel) {
   if(pagamento){
     this.id = pagamento.id;
     this.foiAprovado = pagamento.foiAprovado;
   }

    if(pedidoEntity) {
      this.pedido = pedidoEntity;
    }
  }

  public getDto(): PedidoPagamentoDto {

    return new PedidoPagamentoDto(
      this.pedido?.id,
      this.pagamentoId,
      this.foiAprovado,
      this.id
    );
  }
}
