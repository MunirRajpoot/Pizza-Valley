import pizzaData from "@/models/PizzaData";
import db from "../../utils/db";

export default async function handler(req, res) {
    // Enable CORS for multiple origins
    const allowedOrigins = [
        'https://pizza-valley.vercel.app',
        'https://pizza-valley-qqrwwq15q-developer-5k.vercel.app',
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://pizza-valley.vercel.app'); // default fallback
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        // Handling POST request
        if (req.method === "POST") {
            // Validate incoming data
            if (!Array.isArray(req.body)) {
                return res.status(400).json({ error: "Invalid data format. Expected an array." });
            }

            await db.connect();

            // Save each pizza to the database
            for (let i = 0; i < req.body.length; i++) {
                const { name, category, foodType, price, description, img } = req.body[i];

                // Validate required fields
                if (!name || !category || !foodType || !price || !description || !img) {
                    return res.status(400).json({ error: `Missing required fields for item ${i + 1}` });
                }

                // Validate price object structure
                if (typeof price !== "object" || !price.regular || !price.medium || !price.large) {
                    return res.status(400).json({ error: `Invalid price structure for item ${i + 1}` });
                }

                // Create and save pizza document
                const pizza = new pizzaData({
                    name,
                    category,
                    foodType,
                    price,
                    description,
                    img,
                });

                await pizza.save();
            }

            await db.disconnect(); // Disconnect after saving data
            return res.status(200).json({ message: "Data saved successfully 🥳🥳🥳" });
        }

        // Handling GET request
        if (req.method === "GET") {
            await db.connect();
            const data = await pizzaData.find({});
            await db.disconnect(); // Disconnect after fetching data
            return res.status(200).json(data);
        }

        // Handle unsupported HTTP methods
        res.status(405).json({ error: "Method Not Allowed" });

    } catch (error) {
        console.error("Error in API handler:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
