import Order from "@/models/Order";
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
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: `Method ${req.method} not allowed` });
    }

    await db.connect();

    try {
        const { email, order_data, order_date } = req.body;

        // Validate request data
        if (!email || !Array.isArray(order_data) || !order_date) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request data" });
        }

        // Add the order date to the order data
        const data = [...order_data];
        data.unshift({ order_date });

        const existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // Create a new order document if it doesn't exist
            await Order.create({ email, order_data: [data] });
        } else {
            // Update the existing order document
            await Order.updateOne(
                { email },
                { $push: { order_data: data } }
            );
        }

        res.status(200).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await db.disconnect();
    }
}
