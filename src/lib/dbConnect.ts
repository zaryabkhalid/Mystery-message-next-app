import mongoose from "mongoose";

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
	if (connection.isConnected) {
		console.log("Already connected to database");
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI!, {
			dbName: process.env.DATABASE_NAME!,
		});
		// console.log("Db", db);
		connection.isConnected = db.connections[0].readyState;
		// console.log("Connections", db.connections);

		mongoose.connection.on("connected", () => {
			console.log("Database is connected Successfully");
		});
	} catch (error) {
		console.log("Database coonnection Fails", error);
		process.exit(1);
	}
}

export default dbConnect;
