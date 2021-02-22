import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

const app = express();

const userName = process.env.USER_NAME;
const userPassword = process.env.USER_PASSWORD;
const databaseName = process.env.DATABASE_NAME;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/users", routes.users);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${userPassword}@cluster0.l5sdh.mongodb.net/${databaseName}`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );
    app.listen(process.env.PORT, () => {
      console.log("Server has been started...");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
