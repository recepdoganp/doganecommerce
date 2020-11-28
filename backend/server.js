import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import cors from "cors";
import morgan from "morgan";

// import dependency files
import connectDB from "./config/db.js";

// export middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// import routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// use .env variables
dotenv.config();

connectDB();

// initiate express app
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// mount routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// serve upload folder as static folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running");
  });
}

// If trying to access an incorrect URL
app.use(notFound);
// Error handler middleware
app.use(errorHandler);

app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
