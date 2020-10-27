import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// import dependency files
import connectDB from "./config/db.js";

// export middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// import routes
import productRoutes from "./routes/productRoutes.js";

// use .env variables
dotenv.config();

connectDB();

// initiate express app
const app = express();

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/products", productRoutes);

// If trying to access an incorrect URL
app.use(notFound);
// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
