import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddlerware from "./middleware/error-handler.js";
const app = express();

import dotenv from "dotenv";
dotenv.config();

notFoundMiddleware;

app.get("/", (req, res) => {
  throw new Error("error");
  res.send("Welcome");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddlerware);

app.listen(3000, () => {
  console.log(`Server running on ${3000}`);
});
