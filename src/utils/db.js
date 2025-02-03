import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "your-default-mongo-uri";
if (!mongoURI) {
    throw new Error("MongoDB URI is not defined. Check your .env file.");
}

console.log("mongoURI", mongoURI);


const connection = {};

async function connect() {
    // If already connected, no need to reconnect
    if (connection.isConnected) {
        console.log("Already connected.");
        return;
    }

    // If there are existing connections, check if it's ready
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Using the existing connection.");
            return;
        }
        await mongoose.disconnect(); // Disconnect if not the right state
    }

    // Connect to MongoDB
    const db = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("Connection established.");
}

async function disconnect() {
    // Disconnect only if connected
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
