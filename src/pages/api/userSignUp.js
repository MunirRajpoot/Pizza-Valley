import Users from '@/models/Users';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const jwtSecret = process.env.JWT_SECRET || "default_secret"; // Use the default secret if the JWT_SECRET environment variable is not set

console.log("jwtSecret:", jwtSecret);


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
    if (req.method === "POST") {
        let success = false;

        try {
            // Connect to the database
            await db.connect();

            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt);

            // Create a new user in the database
            const user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: securePass,
                location: req.body.location,
            });

            // Generate JWT token
            const data = {
                user: {
                    id: user._id,
                },
            };
            const authToken = jwt.sign(data, jwtSecret);
            const isAdmin = await user.isAdmin;
            success = true;
            res.status(200).json({ success, authToken, isAdmin });
        } catch (error) {
            // Handle errors
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } finally {
            // Disconnect from the database
            await db.disconnect();
        }
    } else {
        // Handle non-POST requests
        res.status(405).json({ error: "Method not allowed" });
    }
}
