import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const jwtSecret = process.env.JWT_SECRET || "default_secret";

export default async function handler(req, res) {
    const allowedOrigins = [
        'https://pizza-valley.vercel.app',
        'https://pizza-valley-qqrwwq15q-developer-5k.vercel.app',
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    try {
        await db.connect();
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, error: "Try Login with correct Email..." });
        }

        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return res.status(400).json({ success: false, error: "Try Login with correct Password..." });
        }

        const data = { user: { id: user._id } };
        const authToken = jwt.sign(data, jwtSecret);
        const isAdmin = user.isAdmin;

        return res.status(200).json({ success: true, authToken, isAdmin });
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}
