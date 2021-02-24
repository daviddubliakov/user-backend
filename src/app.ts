import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

const app = express();

const databaseName = process.env.DATABASE_NAME;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/users", routes.users);

const start = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    app.listen(process.env.PORT, () => {
      console.log("Server has been started...");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
