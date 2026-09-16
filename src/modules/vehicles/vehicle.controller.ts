import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
     try{
        const result = await vehicleService.createVehicle(req.body);
        res.status(201).json({success: true, message: "vehicle created successfully", data: result.rows[0]});
     }
     catch(err: any){
        res.status(404).json({success: false, message: err.message});
     }
}

const getAllVehicle = async(req: Request, res: Response) => {
    try{
        const result = await vehicleService.getAllVehicle();
        return res.status(200).json({success: true, message: result.rows.length ? "vehicles retrived successfully" : "No vehicle found", data: result.rows});
    }
    catch(err: any){
       return res.status(404).json({success: false, message: err.message});
    }
}

const getVehicleById = async (req: Request, res: Response) => {
    try{
        const result = await vehicleService.getVehicleById(req.params.vehicleId as string);
        //if(result == null) res.status(200).json({success: true, message: "No vehicle found", data: {}};
        return res.status(200).json({success: true, message: result.rowCount ? "vehicle retrived successfully" : "No vehicle found", data: result.rows[0]});
    }
    catch(err: any){
        return res.status(404).json({successs: false, message: err.message});
    }
}

const updateVehicle = async (req: Request, res: Response) => {
    try{
        const result = await vehicleService.updateVehicle(req.params.vehicleId as string ,req.body);
        //if(result == null) res.status(200).json({success: true, message: "vehicle not found"});
        if(result?.rowCount === 0) return res.status(404).json({success: false, message: "Vehicle not found"});
        
        return res.status(200).json({success: true, message: "vehicle updated successfully", data: result?.rows[0]});
    }
    catch(err: any){
        return res.status(404).json({success: false, message: err.message});
    }
}

const deleteVehicle = async (req: Request, res: Response) => {
    try{
        const result = await vehicleService.deleteVehicle(req.params.vehicleId as string);
        // if(result == null) res.status(200).json({success: false, message: "vehicle not found or vehicle is booked already"});
        if(result.rowCount === 0) return res.status(400).json({success: false, message: "vehicle not found or vehicle is booked already"});
        
        return res.status(200).json({success: true, message: "Vehicle deleted successfully"});
    }
    catch(err: any){
        res.status(404).json({success: false, messsage: err.message});
    }
}

export const vehicleController = {
    createVehicle,
    getAllVehicle,
    getVehicleById,
    updateVehicle,
    deleteVehicle
}