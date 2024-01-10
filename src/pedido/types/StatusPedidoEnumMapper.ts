import { PedidoStatusEnum } from './PedidoStatusEnum';
import { InternalServerErrorException } from '@nestjs/common';

export class StatusPedidoEnumMapper {
  
  static numberParaEnum(codigo?: number): PedidoStatusEnum{
    switch (codigo){
      case 0:
        return PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO;
      case 1:
        return PedidoStatusEnum.RECEBIDO;
      case 2:
        return PedidoStatusEnum.EM_PREPARACAO;
      case 3:
        return PedidoStatusEnum.PRONTO;
      case 4:
        return PedidoStatusEnum.FINALIZADO;
      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }
  
  static stringParaEnum(opcao?: string): PedidoStatusEnum{
    switch (opcao){
      case "AGUARDANDO_CONFIRMACAO_PAGAMENTO":
        return PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO;
      case "RECEBIDO":
        return PedidoStatusEnum.RECEBIDO;
      case "EM_PREPARACAO":
        return PedidoStatusEnum.EM_PREPARACAO;
      case "PRONTO":
        return PedidoStatusEnum.PRONTO;
      case "FINALIZADO":
        return PedidoStatusEnum.FINALIZADO;
      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }

  static enumParaString(status? : PedidoStatusEnum): string {

    switch (status){
      case PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
        return "AGUARDANDO_CONFIRMACAO_PAGAMENTO";
      case PedidoStatusEnum.RECEBIDO:
        return "RECEBIDO";
      case PedidoStatusEnum.EM_PREPARACAO:
        return "EM_PREPARACAO";
      case PedidoStatusEnum.PRONTO:
        return "PRONTO";
      case PedidoStatusEnum.FINALIZADO:
        return "FINALIZADO";
      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }

  static enumParaNumber(status? : PedidoStatusEnum): number{
    switch (status){
      case PedidoStatusEnum.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
        return 0;
      case PedidoStatusEnum.RECEBIDO:
        return 1;
      case PedidoStatusEnum.EM_PREPARACAO:
        return 2;
      case PedidoStatusEnum.PRONTO:
        return 3;
      case PedidoStatusEnum.FINALIZADO:
        return 4;

      default:
        throw new InternalServerErrorException("Status Inválido");
    }
  }

  static numberParaString(codigo?: number): string {
    const enumStatus = StatusPedidoEnumMapper.numberParaEnum(codigo);
    return StatusPedidoEnumMapper.enumParaString(enumStatus);
  }

  static stringParaNumber(codigo?: string): number {
    const enumStatus = StatusPedidoEnumMapper.stringParaEnum(codigo);
    return StatusPedidoEnumMapper.enumParaNumber(enumStatus);
  }
}

