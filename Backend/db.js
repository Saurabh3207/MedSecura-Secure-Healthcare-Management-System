const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "database.sqlite"),
});

async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("Connection to the database has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		throw new Error("Database connection failed");
	}
}

async function create_tables_using_sql_file() {
	// this should execute the sql file to create the tables
	const createTableQuery = fs.readFileSync(path.join(__dirname, ".", "database.sql"), "utf8");

	// Split the SQL file into individual statements
	const statements = createTableQuery.split(/;(?!$)/);

	try {
		for (const statement of statements) {
			// Skip any empty statements
			if (statement.trim() !== "") {
				await sequelize.query(statement);
			}
		}
		console.log("Tables created successfully");
	} catch (error) {
		console.error("Error creating tables:", error);
		throw new Error("Error creating tables");
	}
}

async function run_things() {
	await testConnection();
	await create_tables_using_sql_file();
}

run_things();

module.exports = sequelize;
