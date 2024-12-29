import Users from '@/models/Users';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const jwtSecret = "s2$a766hvtd"; // Store this in an environment variable for better security.

export default async function handler(req, res) {
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

            success = true;
            res.status(200).json({ success, authToken });
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
