import db from "../database.js";

// Get all NFTs (Protected)
export const getNFTs = async (req, res) => {
  try {
    const [results] = await db.execute("SELECT * FROM nft_details");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new NFT (Protected)
export const createNFT = async (req, res) => {
  const { name, description, total_supply, image, price } = req.body;
  if (!name || !description || !total_supply || !image || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql =
      "INSERT INTO nft_details (name, description, total_supply, image, price) VALUES (?, ?, ?, ?, ?)";
    const values = [name, description, total_supply, image, price];
    const [result] = await db.execute(sql, values);
    res
      .status(201)
      .json({ message: "NFT added successfully!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
