import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const jwtSecret = process.env.JWT_SECRET || "default_secret";

export default async function handler(req, res) {
    // ✅ Allowed origins (local + production + preview)
    const allowedOrigins = [
        "http://localhost:3000",
        "https://pizza-valley.vercel.app",
        "https://pizza-valley-qqrwwq15q-developer-5k.vercel.app",
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        res.setHeader("Access-Control-Allow-Origin", "https://pizza-valley.vercel.app"); // fallback
    }

    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // ✅ Handle OPTIONS preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // ✅ Allow only POST
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    try {
        await db.connect();

        const { email, password } = req.body;

        // Check if user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid email or password." });
        }

        // Validate password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, error: "Invalid email or password." });
        }

        // Generate JWT token
        const tokenPayload = { user: { id: user._id } };
        const authToken = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            authToken,
            isAdmin: user.isAdmin,
            message: "Login successful!",
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}
