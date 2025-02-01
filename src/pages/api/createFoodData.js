
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

        try {

            let pizza = new pizzaData({
                name: req.body.name,
                category: req.body.foodCategory,
                foodType: req.body.foodType,
                price: req.body.price,
                description: req.body.description,
                img: req.body.img,
            });
            await pizza.save();

            res.status(200).json({ success: true });
        }

        catch (error) {
            res.status(400).json({ error: error });
        }


        db.disconnect();
    }
}
