// import cors from "cors";
import "express-async-errors";
import morgan from "morgan";
import express from "express";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
import dotenv from "dotenv";
dotenv.config();

// db and authentication
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddlerware from "./middleware/error-handler.js";
import auth from "./middleware/auth.js";

// app.use(cors());

if (process.env.NODE !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/", express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});
app.get("/api/v1", (req, res) => {
  res.json({ msg: "Api" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth", auth, jobsRouter);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddlerware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(3000, () => {
      console.log(`Server running on ${3000}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
