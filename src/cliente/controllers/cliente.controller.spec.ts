import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from '../services';

describe('ClienteController', () => {
  let clienteController: ClienteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [ClienteService],
    }).compile();

    clienteController = app.get<ClienteController>(ClienteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(clienteController.getHello()).toBe('Hello World!');
    });
  });
});
