import express from "express";
import "dotenv/config";
import cors from "cors";
import productsRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "../config/db.js";
import { notFound, errorHandler } from "./middlewares/errors.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`e-commerce listening in port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
