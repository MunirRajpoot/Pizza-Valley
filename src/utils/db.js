import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI; 

const connection={};

async function connect(){
    if (connection.isConnected) {
        console.log("Already connected.");
        return;
    }
    if (mongoose.connections.length >0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Use previous connection.");
            return;
            
        }
        await mongoose.disconnect();
    }

    const db= await mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

    console.log("connection created");
    
}

async function disconnect(){
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
        }else{
            console.log("not disconnected");
        }
    }
}

const db = {connect, disconnect};
export default db;