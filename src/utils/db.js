import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "your-default-mongo-uri";
if (!mongoURI) {
    throw new Error("MongoDB URI is not defined. Check your .env file.");
}

console.log("mongoURI", mongoURI);

const connection = {};

async function connect() {
    if (connection.isConnected) {
        console.log("Already connected.");
        return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Using the existing connection.");
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(mongoURI); // 🔧 Cleaned: removed deprecated options

    connection.isConnected = db.connections[0].readyState;
    console.log("Connection established.");
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
            console.log("Disconnected from database.");
        } else {
            console.log("Not disconnected in development mode.");
        }
    }
}

const db = { connect, disconnect };
export default db;
