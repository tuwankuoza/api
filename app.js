const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { authenticateJWT } = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticateJWT, userRoutes);

async function startServer() {
  try {
    // Redis Client
    const redisClient = redis.createClient({
      url: process.env.REDIS_URL,
    });
    await redisClient.connect();
    console.log("Redis connected");
    app.set("redisClient", redisClient);

    // MongoDB Connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
