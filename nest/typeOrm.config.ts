import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: process.env.NODE_ENV != "prod" ? "127.0.0.1" : "db",
    port: 5432,
    username: "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: "postgres",
    entities: ["./src/entities/**/*.ts"],
    migrations: ["./migrations/**/*.ts"],
});
