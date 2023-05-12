import express from "express";

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth", jobsRouter);

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
