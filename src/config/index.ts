import dotenv from "dotenv";

dotenv.config();

const config = {
     port: process.env.PORT,
     db_url: process.env.DATABASE_URL,
     secret: process.env.JWT_SECRET
} 

export default config;