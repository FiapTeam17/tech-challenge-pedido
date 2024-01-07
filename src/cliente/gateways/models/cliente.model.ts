import {ClienteDto, ClienteRetornoDto} from "../../dtos";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    // @OneToMany(() => PedidoModel, (pedido) => pedido.cliente)
    // pedidos?: PedidoModel[];

    constructor(cliente?: ClienteDto){
        if(cliente){
            if(cliente.id){
                this.id = cliente.id;
            }
            this.nome = cliente.nome;
            this.email = cliente.email;
            if(cliente.cpf) {
                this.cpf = cliente.cpf;
            }
        }
    }

    public getClientDto(): ClienteRetornoDto {
        return new ClienteRetornoDto(this.nome, this.cpf, this.email, this.id);
    }
}