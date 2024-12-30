import db from "@/utils/db";

export default async function handler(req, res) {   

    if (req.method !== "POST") {
        await db.connect();

        let data= req.body.order_date;
        await data.splice(0,0,{order_date:req.body.order_date});
    }
    res.status(200).json({});
}