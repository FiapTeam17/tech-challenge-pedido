import {Module} from "@nestjs/common";
import {DatabaseModule} from "../config/database";
import { produtoProviders } from './produto.providers';
import { ProdutoController } from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProdutoController],
  providers: [...produtoProviders]
})
export class ProdutoModule {}
