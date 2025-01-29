import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR: ", error);
    //throw error;
    process.exit(1);
  }
};
/*
const connectDB = () => {
  mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    .then((connectionInstance) => {
      console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    })
    .catch((error) => {
      console.error("MONGODB CONNECTION ERROR: ", error);
      process.exit(1);
    });
};
*/

export default connectDB;
