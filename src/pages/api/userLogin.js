import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

export const jwtSecret = "s2$a766hvtd";

export default async function handler(req, res) {
    // Enable CORS for allowed origins
    const allowedOrigins = [
        'https://pizza-valley.vercel.app', // Production URL
        'https://pizza-valley-qqrwwq15q-developer-5k.vercel.app', // Development preview URL
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin); // Allow the origin
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*'); // For testing, use wildcard (not recommended for production)
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Respond with status 200 to preflight requests
    }
    let success = false;
    if (req.method === "POST") {
        await db.connect();

        const { email, password } = req.body;

        try {
            let user = await Users.findOne({ email });

            if (!user) {
                res.status(400).json({ success, error: "Try Login with correct Emails..." })
            }

            const pwdCompare = await bcrypt.compare(password, user.password);

            if (!pwdCompare) {
                res.status(400).json({ success, error: "Try Login with correct Password..." })

            }

            const data = {
                user: {
                    id: user._id,
                },
            };
            const authToken = jwt.sign(data, jwtSecret);
            const isAdmin= await user.isAdmin;

            success = true;
            res.status(200).json({ success, authToken, isAdmin: isAdmin });
        } catch (error) {
            console.log(error.message);
            res.send("Server Error...");

        }

    }

    res.status(200).json({ name: 'John doi...' });


}