import { NextApiRequest, NextApiResponse } from 'next';
import Users from '@/models/Users';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const config = {
  api: {
    bodyParser: true,  // Ensure the body is parsed correctly
  },
};

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        await db.connect();

        const { name, email, password, location } = req.body;
        if (!name || !email || !password || !location) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
            location,
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(201).json({ success: true, token, isAdmin: user.isAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        await db.disconnect();
    }
}
