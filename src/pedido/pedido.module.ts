import { Module } from '@nestjs/common';
import { DatabaseModule } from '../config/database';
import { pedidoProviders } from './pedido.providers';
import { PedidoController } from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [PedidoController],
  providers: [...pedidoProviders]
})
export class PedidoModule {}
