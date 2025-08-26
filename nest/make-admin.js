const { Client } = require("pg");

async function makeAdmin() {
    const client = new Client({
        host: "localhost",
        port: 5432,
        database: "postgres",
        user: "postgres",
        password: "postgres",
    });

    try {
        await client.connect();

        // Обновляем пользователя, делая его админом
        const result = await client.query(
            'UPDATE "user" SET "isAdmin" = true WHERE email = $1',
            ["admin@example.com"],
        );

        console.log("Admin user updated:", result.rowCount);

        // Проверяем результат
        const user = await client.query(
            'SELECT id, email, name, "isAdmin" FROM "user" WHERE email = $1',
            ["admin@example.com"],
        );

        console.log("User:", user.rows[0]);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.end();
    }
}

makeAdmin();
