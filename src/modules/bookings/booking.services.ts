import { pool } from "../../config/db";

const createBooking = async (payload: any) => {
    const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;
    const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicle_id]);
    
    if(vehicle.rowCount == 0) return null;  // vehicle not found
    
    const daily_rent_price = vehicle.rows[0].daily_rent_price;
    const duration = Number(rent_end_date - rent_start_date);
    const total_price = daily_rent_price * duration;
    const availability_status = vehicle.rows[0].availability_status;

    if(availability_status == "available") return null;  // vehicle status available
    
    const result = await pool.query(`INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price) VALUES($1,$2,$3,$4) RETURN *`,[customer_id,vehicle_id,rent_start_date,rent_end_date,total_price]);
    await pool.query(`UPDATE vehicles SET availability_status = $1`,[availability_status]);
    return result;
}

const getAllBokkings = async () => {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
}

const getAllBookingsById = async (id: string) => {
    
    if(id)
    {
        const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`,[id]);
        return result;
    }
    else
    {
       const result = await pool.query(`SELECT * FROM bookings`);
       return result;
    }
    
}

const updateBooking = async (id: string, status: string) => { // id kno string
        const result = await pool.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURN *`, [status,id]);
        if(result.rows[0].status == "returned")
          await  pool.query(`UPDATE vehicles SET availability_status = $1 WHERE id = $2`,["available",id]);
        return result;
}

export const bookingService = {
    createBooking,
    getAllBokkings,
    getAllBookingsById,
    updateBooking
}