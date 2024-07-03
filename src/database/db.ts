import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";

import { Author1719825232288 } from "./migrations/1719825232288-author";
import { User1719825005301 } from "./migrations/1719825005301-user";
import { Book1719832589220 } from "./migrations/1719832589220-book";
import { Favourites1719906594220 } from "./migrations/1719906594220-favourites";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [`${__dirname}/models/**/*{.ts,.js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    synchronize: false,
    logging: false,
})