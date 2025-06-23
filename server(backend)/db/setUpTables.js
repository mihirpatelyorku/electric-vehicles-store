const { Client } = require("pg");
require("dotenv").config();
SQL = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(55) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(55) NOT NULL,
    lastName VARCHAR(55) NOT NULL,
    mobile VARCHAR(15) NOT NULL
);`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("table created successfully");
  } catch (error) {
    console.log(await client.end());
  } finally {
    await client.end();
  }
}

main();
