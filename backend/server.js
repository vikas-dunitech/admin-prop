import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/autRoutes.js";
import nftRoutes from "./routes/nftRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/nfts", nftRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
