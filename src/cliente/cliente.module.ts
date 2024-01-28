import {Module} from "@nestjs/common";
import {ClienteController} from "./controllers";
import {clienteProviders} from "./cliente.providers";
import {DatabaseModule} from "../config/database";

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [...clienteProviders]
})
export class ClienteModule {}
