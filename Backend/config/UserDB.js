import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USER_DB_URI = process.env.MONGODB_URI_USERS;

const userDB = mongoose.createConnection(USER_DB_URI);

userDB.on("connected", () => {
  console.log("server Connected to UserDB (Cluster 2)");
});

userDB.on("error", (err) => {
  console.log("❌ Error connecting to UserDB:", err);
});

export default userDB;
