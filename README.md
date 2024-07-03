# Steps to follow

1.  git init (creates our git repo)

2.  npm init (creates node_modules)

3.  npm i express (creating framework environment)

4.  npm i typescript -d (install typescript with DEV dependancy)

5.  npm i --save-dev @types/express @types-node -D (install types)

6.  npx tsc --init

7.  create folder SRC and inside create tsc file and modify outDir in tscconfig to be ./dist

8.  add into package.json

    scripts:
    "start": "node ./dist/server.js",
    "dev": "nodemon ./src/server.ts",
    "build": "tsc"

9.  npm tsc (to compile all files from TS to JS)

10. npm i nodemon -D (to watch the TS file and compile automaticly)

11. npm i ts-node -D (refreshes the TS if not working)

12. check the package.json to see if all the dependancies are installed

("devDependencies":
{ "@types/express": "^4.17.17",
"@types/node": "^16.11.10",
"ts-node": "10.7.0",
"typescript": "4.5.2"
"ts-node-dev": "^2.0.0", },
"dependencies": {
"express": "^4.18.2",
},)

From here we can use NPM RUN DEV to start our server with npm run dev :)

13. npm i dotenv (file for variables which will be hidden)

14. import 'dotenv/config' in server.ts and db.ts

15. Create the .env file in the root directory of your project and add the necessary environment variables. (include the variables) also add .env to .gitignore

----- FROM HERE WE START OUR DB AND CONNECT IT -------

16. npm i typeorm (installing typeorm for TS)

17. npm install reflect-metadata

18. npm install @types/node --save-dev

19. npm install mysql2 --save

20. uncomment "experimentalDecorators": "emitDecoratorMetadata":

21. Create new folder into SRC with name DATABASE AND new file inside db.ts and include the following:

    import "reflect-metadata" import { DataSource } from "typeorm" export const AppDataSource = new DataSource({ type: "mysql", host: "localhost", port: 3306, username: "root", password: "", database: "test", entities: [], synchronize: false, logging: false, }) MAKE SURE YOU HAVE ALL THE NEEDED INFO ABOVE UPDATED SUCH AS PASSWORD, USERNAME, HOSTNAME

22. create in SQL new schema > name "database_name"

23. go to file server.ts > import { AppDataSource } from './database/db';

24. In the same file server.ts import:

          AppDataSource.initialize() .then(() =>
          { console.log('Database connected'); })
          .catch(error => { console.log(error) })

25. changes in env added the needed connections variables needed in env.exmaple

------- MIGRATIONS MAKING ----------

26. npx typeorm migration:create ./src/database/migrations/user
    (create the migration from SQL Workbench to our VScode folder Database)

27. add migration dependancy in db.ts (insert migrations: [Author1719825232288, User1719825005301],)

28. npx typeorm-ts-node-commonjs migration:run -d ./src/database/db.ts (execute to do migrations of all db.ts files that need to be migrated)

29. added scripts "migrations" , "revert.migrations" to execute directly as npm run migrations

-------- MODELS MAKING -----------

30. create folder models into folder database

31. npx typeorm entity:create ./src/database/models/Author

32. insert into new created file:

    import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

   @Entity()
   export class Author extends BaseEntity{
   @PrimaryGeneratedColumn()
   id!: Number

    @Column({ name: 'name'})
    name!: string

    @Column({name: 'nationality'})
    nationality!: string

   }

33. add the needed columns and entities into the file

34. add entities in db such as entities: [`${__dirname}/models/**/*{.ts,.js}`]

35. to the controller of the specified table we need to follow some steps for the different CRUD types:

     for CREATE:
    a) obtain the information from the DB
    b) validate it
    c) filtrate it if needed
    d) save it 
    e) provide a response

    for GET:
    a) obtain the information from the DB
    b) return the information

    _________________________________

    Enciptar contraseña

    1. Descargar librería:
    ```
    npm i bcrypt
    ```

    2. Importar en el archivo controller que sea necesario, en este caso auth.controller
    ```
    import bcrypt from 'bcrypt':
    ```

    3. Instalar los tipos de bcrypt:
    ```
    npm i --save-dev @types/bcrypt

    4. Encriptar la contraseña

    ```
    const hashedPassword = bcrypt.hashSync(password, 10);
    ```
    Los argumentos son la contraseña y el nro de veces que se encriptará.