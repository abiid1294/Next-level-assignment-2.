import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs"


// const createUser = async (payload: any) => {

//         const {name, email, password, phone, role} = payload;
//         const hashedPassword = bcrypt.hash(password, 10);
//         const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURN *`, [name, email, hashedPassword, phone, role]);
//         return result;     
// }

const getAllUsers = async ()=> {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

const updatedUser = async (id: string, payload: any) => {
     const {name, email, phone, role} = payload;
     const result = await pool.query(`UPDATE users SET name = COALESCE($1, name), email = ($2, email), phone = ($3, phone), role = ($4, role) RETURN *`, [name, email, phone, role]);
     return result;
}

const deleteUser = async (id: string) => {
    // const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    // if(result.rowCount == 0) return false;
    // active bookings exist then return false
    return await pool.query(`DELETE FROM users WHERE id = $1
                      AND NOT EXISTS (
                       SELECT 1 FROM bookings
                       WHERE customer_id = $1 AND status = 'active') RETURN id`,[id]);
   
    
}





export const userService = {
    getAllUsers,
    updatedUser,
    deleteUser
}