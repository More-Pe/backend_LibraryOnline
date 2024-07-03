# Steps to follow
 1. git init (creates our git repo)
 2. npm init (creates node_modules)
 3. npm i express (creating framework environment)
 4. npm i --save-dev @types/express (install types)
 5. npm i typescript -d (install typescript with DEV dependancy)
 7. create tsc file and modify outDir in tscconfig to be ./dist
 6. npm tsc (to compile all files from TS to JS) 
 7. npm i nodemon -D (to watch the TS file and compile automaticly)
 8. npm i ts-node -D (refreshes the TS if not working)
 9. npm i dotenv (file for variables which will be hidden)
 10. npm i typeorm (installing typeorm for TS)
 11. npm install reflect-metadata
 12. npm install @types/node --save-dev
 13. npm install mysql2
 14. uncomment    "experimentalDecorators": AND  "emitDecoratorMetadata": true
 15. create in SQL new schema > name "library_online"
 16. create folder DATABASE > db.ts > import import "reflect-metadata"
import { DataSource } from "typeorm"
17. server.ts > import the const 
18. changes in env added the needed connections variables needed in env.exmaple
19. npx typeorm migration:create ./src/database/migrations/user    (create the migration from SQL Workbench to our VScode folder Database)
20. add migration dependancy in db.ts (insert migrations: [Author1719825232288, User1719825005301],)
21. npx typeorm-ts-node-commonjs migration:run -d ./src/database/db.ts (execute to do migrations of all db.ts files that need to be migrated)
22. added scripts "migrations" , "revert.migrations" to execute directly as npm run migrations
