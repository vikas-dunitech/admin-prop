import express from "express";
import { getNFTs, createNFT } from "../controllers/nftController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";  // Named import ✅

const router = express.Router();

// GET all NFTs (Protected)
router.get("/", verifyToken, getNFTs);

// POST: Add a new NFT (Protected)
router.post("/", verifyToken, createNFT);
export default router;
