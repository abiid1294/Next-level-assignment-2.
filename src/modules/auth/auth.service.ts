import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (payload: any) => {
     const {name,email,password,phone} = payload;

     if(!name || !email || !password || !phone)
        throw new Error ("name, email, password and phone are requiered");

     if(password.length < 6){
        throw new Error ("Password must be at least 6 characters");
     }

     const hashedPassword = bcrypt.hash(password, 10); // password must be hashed before stored in 
    
     const result = await pool.query(`INSERT INTO users(name,emial,password,phone,role) VALUE($1,$2,$3,$4,$5) RETURN *`,[name, email, hashedPassword, phone, "customer"]);
     return result;
}

const login = async (payload: any) => {
    const {email, password} = payload;
    const result = await pool.query(`SELECT * from users WHERE email = $1`,[email]);
    if(result.rowCount === 0)
    {
        throw new Error("Invalid email or password");
        // return null;
    }
    
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if(!match)
        {
            throw new Error ("Invalid email or password");
             //return null;
        }            
            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role       
                },
                config.secret as string,
                {
                    expiresIn : "10d" ,
                }
            );

            // remove password before returning
            return {user: user, token: token};
}
    
export const authService = {
    createUser,
    login
}