import Users from '@/models/Users';
import db from '@/utils/db';
import bcrypt from 'bcryptjs'; 

export default async function handler(req, res) {
    let success = false;
    const salt = await bcrypt(10);

     let securePass= await bcrypt.hash(req.body.password,salt);

     if (req.method==="POST") {
        await db.connect();

        try {
            await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: securePass,
                location: req.body.location,
            }).then((user)=>{
              const data={
                
              }
            })
        } catch (error) {
            
        }
     }

    res.status(200).json({ name: 'John Doe' });
}