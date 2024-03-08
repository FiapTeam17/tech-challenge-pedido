import {ClienteAlterarDto, ClienteDto, ClienteRetornoDto} from "../../dtos";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoModel } from '../../../pedido/gateways';

@Entity("Cliente")
export class ClienteModel {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    nome?: string;

    @Column({
        type: "varchar",
        length: 11,
        nullable: false
    })
    cpf?: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    email?: string;

    @Column({
        type: "boolean",
        nullable: false
    })
    ativo: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    excluido: boolean;

    @OneToMany(() => PedidoModel, (pedido) => pedido.cliente)
    pedidos?: PedidoModel[];

    constructor(cliente?: ClienteDto, ativo?: boolean, excluido?: boolean){
        if(cliente){
            if(cliente.id){
                this.id = cliente.id;
            }
            this.nome = cliente.nome;
            this.email = cliente.email;
            this.cpf = cliente.cpf;
        }
    }

    public getClientDto(): ClienteRetornoDto {
        return new ClienteRetornoDto(this.nome, this.cpf, this.email, this.id, this.ativo, this.excluido);
    }
}
