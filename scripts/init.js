const DATABASE_URL =
	"postgresql://adrien:tlPLdBxHEfYYYLLqQ5jElA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dchirpy-wolf-4933";

const { Client } = require("pg");

(async () => {
	const client = new Client({
		connectionString: DATABASE_URL,
		application_name: "$ docs_quickstart_node",
	});

	const statements = [
		// CREATE the messages table
		"CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message STRING)",
		// INSERT a row into the messages table
		// "INSERT INTO messages (message) VALUES ('Hello world!')",
		// // SELECT a row from the messages table
		// "SELECT message FROM messages",

		// "DROP TABLE messages",
	];

	try {
		// Connect to CockroachDB
		await client.connect();
		for (let n = 0; n < statements.length; n++) {
			let result = await client.query(statements[n]);
			if (result.rows[0]) {
				console.log(result.rows[0].message);
			}
		}
		await client.end();
	} catch (err) {
		console.log(`error connecting: ${err}`);
	}

	// Exit program
	process.exit();
})().catch((err) => console.log(err.stack));
