import { Request, Response } from "express";
import { authService } from "./auth.service";
import { vehicleService } from "../vehicles/vehicle.service";

const createUser = async (req: Request, res: Response) => {
      try{
          const result = await authService.createUser(req.body);
          res.status(201).json({success: true, message: "User registered successfully", data: result.rows[0]});
      }
      catch(err: any){
          res.status(404).json({success: false, message: err.message});
      }
}
const login = async (req: Request, res: Response) => {
    try{
        const result = await authService.login(req.body);
        res.status(200).json({success: true, message: "Login successful", user: result?.user, token: result?.token });
    }
    catch(err: any){
        res.status(404).json({success: false, message: err.message});
    }
}



export const authController = {
    createUser,
    login
}