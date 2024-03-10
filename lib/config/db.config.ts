import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost/nextjsauthentication");
    console.log("db is connected with" + mongoose.connection.host);
  } catch (error) {
    mongoose.disconnect();
    process.exit();
  }
};
