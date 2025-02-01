import pizzaData from "@/models/PizzaData";
import db from "@/utils/db";

export default async function handler(req, res) {
    try {
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

                // Validate price object
                if (typeof price !== "object" || !price.regular || !price.medium || !price.large) {
                    return res.status(400).json({ error: `Invalid price structure for item ${i + 1}` });
                }

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
            res.status(200).json({ message: "Data saved successfully 🥳🥳🥳" });
        }

        if (req.method === "GET") {
            await db.connect();
            const data = await pizzaData.find({});
            await db.disconnect(); // Disconnect after fetching data
            res.status(200).json(data);
        }
    } catch (error) {
        console.error("Error in API handler:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}