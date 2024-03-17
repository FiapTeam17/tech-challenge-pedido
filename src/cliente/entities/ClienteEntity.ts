import { BadRequestException } from '@nestjs/common';

export class ClienteEntity {
  constructor(
    readonly id?: number,
    readonly nome?: string,
    readonly cpf?: string,
    readonly email?: string,
    readonly ativo?: boolean,
    readonly excluido?: boolean
  ) {}

  validar() {
    if (!this.cpf) {
      throw new BadRequestException('CPF é obrigatório');
    }
  }
}
