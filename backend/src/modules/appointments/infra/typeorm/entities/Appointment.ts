/*

Models
Os modelos são uma representação fiel aos campos definidos no bancod de dados.

*/

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from '../../../../users/infra/typeorm/entities/User';

// criando uma entidade para definir o modelo da tabela
// aqui se define os campos que comtem na tabela
@Entity('appointments') //nome da tabela
class Appointment {

  @PrimaryGeneratedColumn('uuid') // define como chave primaria
  id: string;

  @Column() // define como coluna comum
  provider_id: string;

  @Column() // define como coluna comum
  user_id: string;
  // cria relação de chave estrangeira entre appointemets e usuários
  @ManyToOne(()=> User ) // relação muitos para um
  @JoinColumn({name: 'user_id'}) // coluna que será a chave estrangeira
  user:User; // tabela que iremos relacionar


  // cria relação de chave estrangeira entre appointemets e usuários
  @ManyToOne(()=> User ) // relação muitos para um
  @JoinColumn({name: 'provider_id'}) // coluna que será a chave estrangeira
  provider:User; // tabela que iremos relacionar


  @Column('time with time zone')
  date: Date;

  @CreateDateColumn() // cria valor automatico para created_at
  created_at: Date;

  @UpdateDateColumn() // cria valor automatico para updated_at
  updated_at: Date;


}


export default Appointment;
