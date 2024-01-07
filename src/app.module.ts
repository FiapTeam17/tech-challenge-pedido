import {Module} from '@nestjs/common';
import {ClienteModule} from "./cliente/cliente.module";

@Module({
  imports: [
    ClienteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
