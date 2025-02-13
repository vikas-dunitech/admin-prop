import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

// User Registration
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const email = req.query.email || req.body.email;
  const password = req.query.password || req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    req.session.user = { id: user.id, email: user.email };

    res.json({ message: "Login successful", token, status: "true" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json({ message: "Profile accessed", user: req.user });
};
