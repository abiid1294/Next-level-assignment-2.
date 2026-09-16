import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
     try{
        const result = await userService.getAllUsers();
        res.status(200).json({success: true, message: "Users retrived successfully", data: result.rows});
     }
     catch(err: any)
     {
        res.status(404).json({success: false, message: err.message});
     }
};

const updateUser = async (req: Request, res: Response) => {
    try{
        const id = req.params.userId;

        if(!req.user) return res.status(401).json({success: false, message:"you are not authorized to update this user"});  // guard
        if(req.user.role == "customer" && String(req.user.id) !== id){
           return res.status(403).json({success: false, message:"you can update your own profile only"});
        }
        
        const result = await userService.updatedUser(id as string, req.body);
        if(result?.rowCount === 0) return res.status(404).json({success: false, message: "User not found"});
        
        return res.status(200).json({success: true, message: "User updated successfully", data: result.rows[0]});
    }
    catch(err: any)
    {
        res.status(404).json({success: false, message: err.message});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try{
        const id = req.params.userID;
        const result = await userService.deleteUser(id as string);
        
        if(result.rowCount === 0) return res.status(400).json({success: false, message: "User not found or has active bookings"});
        
        return res.status(200).json({success: true, message: "User deleted successfully"}); 
    }
    catch(err: any)
    {
        return res.status(404).json({success: false, message: err.message});
    }
}

export const userController = {
    getAllUsers,
    updateUser,
    deleteUser
}