import { InternalServerErrorException } from '@nestjs/common';
import { StatusPagamentoEnum } from './StatusPagamentoEnum';

export class StatusPagamentoEnumMapper {

  static numberParaEnum(codigo?: number): StatusPagamentoEnum {
    switch (codigo) {
      case 0:
        return StatusPagamentoEnum.PENDENTE;
      case 1:
        return StatusPagamentoEnum.PAGO;
      case 2:
        return StatusPagamentoEnum.REJEITADO;
      case 3:
        return StatusPagamentoEnum.CANCELADO;
      case 4:
        return StatusPagamentoEnum.ERRO;      
      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }

  static stringParaEnum(opcao?: string): StatusPagamentoEnum {
    switch (opcao) {
      case "PENDENTE":
        return StatusPagamentoEnum.PENDENTE;
      case "PAGO":
        return StatusPagamentoEnum.PAGO;
      case "REJEITADO":
        return StatusPagamentoEnum.REJEITADO;
      case "CANCELADO":
        return StatusPagamentoEnum.CANCELADO;
      case "ERRO":
        return StatusPagamentoEnum.ERRO;      
      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }

  static enumParaString(status?: StatusPagamentoEnum): string {

    switch (status) {
      case StatusPagamentoEnum.PENDENTE:
        return "PENDENTE";
      case StatusPagamentoEnum.PAGO:
        return "PAGO";
      case StatusPagamentoEnum.REJEITADO:
        return "REJEITADO";
      case StatusPagamentoEnum.CANCELADO:
        return "CANCELADO";
      case StatusPagamentoEnum.ERRO:
        return "ERRO";      
      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }

  static enumParaNumber(status?: StatusPagamentoEnum): number {
    switch (status) {
      case StatusPagamentoEnum.PENDENTE:
        return 0;
      case StatusPagamentoEnum.PAGO:
        return 1;
      case StatusPagamentoEnum.REJEITADO:
        return 2;
      case StatusPagamentoEnum.CANCELADO:
        return 3;
      case StatusPagamentoEnum.ERRO:
        return 4;
      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }

  static numberParaString(codigo?: number): string {
    const enumStatus = StatusPagamentoEnumMapper.numberParaEnum(codigo);
    return StatusPagamentoEnumMapper.enumParaString(enumStatus);
  }

  static stringParaNumber(codigo?: string): number {
    const enumStatus = StatusPagamentoEnumMapper.stringParaEnum(codigo);
    return StatusPagamentoEnumMapper.enumParaNumber(enumStatus);
  }
}

