import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1719825005301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "150",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "250",
                        isNullable: false
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                        isNullable: true
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ['user', 'admin', 'superadmin'],
                        default: "'user'"

                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "datetime",
                        default: "now()",
                        onUpdate: "now()"
                    }
                ]
            }),
            true
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
