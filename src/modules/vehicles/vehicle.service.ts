import { pool } from "../../config/db";

const createVehicle = async (payload: any) => {
     const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;
     const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) value($1,$2,$3,$4,$5) RETURN *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status]);
     return result
}

const getAllVehicle = async ()=> {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

const getVehicleById = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`,[id]);
   // if(result.rowCount == 0) return null;
    return result;
}

const updateVehicle = async (id: string, payload: any) => {
    const { vehicle_name, type, refgistration_number, daily_rent_price, availability_status} = payload;
    const result = await pool.query(`
        UPDATE vehicles 
        SET vehicle_name = COALESCE($1, vehicle_name),
            type = COALESCE($2, type),
            registration_number = COALESCE($3, registration_number),
            daily_price_rent = COALESCE($4, daily_price_rent),
            availability_status = COALESCE($5, availability_status)
        WHERE id = $6
        RETRURN *
     `,
     [vehicle_name, type, refgistration_number, daily_rent_price, availability_status, id] );
    // if(result.rowCount == 0) return null;
     return result;
}

const deleteVehicle = async (id: string) => {
    //const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`,[id]);
    // if(result.rowCount == 0) return null;
    //if(result.rows[0].availability_status == "booked") return null;
       
    // const result1 = await pool.query(`DELETE * FROM vehicles WHERE id = $1`,[id]);
    return pool.query(
    `DELETE FROM vehicles
     WHERE id = $1
       AND NOT EXISTS (
         SELECT 1 FROM bookings
         WHERE vehicle_id = $1 AND status = 'active'
       )
     RETURNING id`,
    [id]
  );
    //return true;
    
    
}

export const vehicleService = {
    createVehicle,
    getAllVehicle,
    getVehicleById,
    updateVehicle,
    deleteVehicle
}