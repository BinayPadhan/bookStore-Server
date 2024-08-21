import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // Separate the base URI and query parameters
        const [baseUri, queryParams] = process.env.MONGODB_URI.split("?");
        // Reconstruct the URI with the database name in the correct position
        const connectionString = `${baseUri}/${DB_NAME}?${queryParams}`;

        const connectionInstance = await mongoose.connect(connectionString);

        console.log(`\n MongoDB connected !!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("ERROR", error);
        process.exit(1);
    }
}

export default connectDB;
