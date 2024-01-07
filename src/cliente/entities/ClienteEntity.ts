import {ClienteRetornoDto} from "../dtos";
import {BadRequestException} from "@nestjs/common";

export class ClienteEntity {
    constructor(
        readonly id?: number,
        readonly nome?: string,
        readonly cpf?: string,
        readonly email?: string
    ) { }
    set(clienteAlt: ClienteEntity) {
        return new ClienteEntity(this.id, clienteAlt.nome, this.cpf, clienteAlt.email);
    }
    validar() {
        if (!this.cpf) {
            throw new BadRequestException("CPF é obrigatório");
        }
    }
    toClienteDto(): ClienteRetornoDto{
        return new ClienteRetornoDto(
            this.nome,
            this.cpf,
            this.email,
            this.id,
        );
    }
}