import { Pool } from "pg";
import config from ".";

export const pool = new Pool({connectionString: config.db_url});

export const db = async () => {
    pool.query(`
      CREATE TABLE IF NOT EXISTS users(
         id PRIMARY KEY,
         name VARCHAR(250) NOT NULL,
         email VARCHAR(250) NOT NULL UNIQUE CHECK(email = LOWER(email)),
         password VARCHAR NOT NULL CHECK(LENGTH(password) >= 6),
         phone VARCHAR(250) NOT NULL UNIQUE,
         role VARCHAR(250) NOT NULL CHECK(role IN ('admin', 'customer'))
      )
   `)

   pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
        id PRIMARY KEY,
        vehicle_name VARCHAR(250) NOT NULL,
        type VARCHAR(250) NOT NULL CHECK(type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(250) NOT NULL UNIQUE,
        daily_rent_price INT NOT NULL CHECK(daily_rent_price > 0),
        availability_status VARCHAR(250) NOT NULL CHECK(availability_status IN ('available', 'booked')),
      ) 
   `)

   pool.query(`
     CREATE TABLE IF NOT EXISTS bookings(
       id PRIMARY KEY,
       customer_id REFERENCES users(id) ON DELETE CASCADE,
       vehicle_id REFERENCES vehicles(id) ON DELETE CASCADE,
       rent_start_date TIMESTAMP NOT NULL,
       rent_end_date TIMESTAMP NOT NULL CHECK(rent_end_date > rent_start_date),
       total_price INT NOT NULL CHECK(total_price > 0),
       status VARCHAR(250) NOT NULL CHECK(status IN ('acitve', 'cancelled', 'returned'))
     )       
   `)
}

// export default db; // for calling db in app.ts