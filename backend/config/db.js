import { Pool } from "pg";


export const pool = new Pool({
    database: "prova",
    host: "localhost",
    user: "postgres",
    password: "1234",
    port: 5432
})
