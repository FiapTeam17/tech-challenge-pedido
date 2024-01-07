import { DataSource } from 'typeorm';
import {DATA_SOURCE} from "../../common/constants";

const db_port: number | undefined = parseInt(process.env.DB_PORT || "3306");
export const databaseProviders = [
    {
        provide: DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: process.env.DB_HOST || "localhost",
                port: db_port,
                username: process.env.DB_USERNAME || "root",
                password: process.env.DB_PASSWORD || "senha",
                database: process.env.DB_SCHEMA || "sgr_database",
                entities: [
                    __dirname + '/../../**/*.model{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];