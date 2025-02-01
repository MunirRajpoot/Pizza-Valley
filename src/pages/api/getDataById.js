
import pizzaData from "@/models/PizzaData";
import db from "@/utils/db";

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
        await db.connect();
        const data = await pizzaData.findById(req.body.item);
        res.status(200).json(data);
    }

    db.disconnect();
}
