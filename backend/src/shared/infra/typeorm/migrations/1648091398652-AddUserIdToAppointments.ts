import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUserIdToAppointments1648091398652 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {


    await queryRunner.addColumn('appointments', new TableColumn({// adiciona uma coluna na tabela appointments
      name: 'user_id',
      type: 'uuid',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({ // adicionando a chave estrangeira
      name: 'appointmentUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }))

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropForeignKey('appointments', 'appointmentUser');
    await queryRunner.dropColumn('appointments', 'user_id');


  }

}
