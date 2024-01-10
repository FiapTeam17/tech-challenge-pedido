import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ClienteModule,
    ProdutoModule,
    PedidoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
