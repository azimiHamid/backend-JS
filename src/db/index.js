import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); we can store it in a variable aswell as the following var: db_instance
    const db_instance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MongoDB connected\nDB Host: ${db_instance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection FAILED! ", error);
    process.exit(1);
  }
};

export default connectDB;
