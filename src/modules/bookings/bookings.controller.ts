import { Request, Response } from "express";
import { bookingService } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
    try{
         const result = await bookingService.createBooking(req.body);
         if(result) res.status(201).json({success: true, message: "booking created successfully", data: result.rows[0]});
         else res.status(4).json({success: false, message: "vehicle not found or vehicle status available"});
    }
    catch(err: any){
        res.status(404).json({success: false, message: err.message});
    }
    
}

const getAllBokkings = async (req: Request, res: Response) => {
    try{
         const {id, role} = req.body;
         if(role == "customer")
         {
            const result = await bookingService.getAllBookingsById(req.params.bookingId as string);
            res.status(200).json({success: true, message: "Your bookings retrieved successfully", data: result.rows[0]});
         }
         else{
             const result = await bookingService.getAllBokkings();
             res.status(200).json({success: true, message: "bookings retrieved successfully", data: result.rows});
         }        
    }
    catch(err: any){
        res.status(404).json({success: false, message: err.message});
    }
}

// const getAllBookingsById = async (req: Request, res: Response) => {
//      try{
//         const result = await bookingService.getAllBookingsById(req.params.bookingId as string);
//         res.status(200).json({success: true, message: "Your bookings retrieved successfully", data: result.rows[0]});
//      }
//      catch(err: any){
//         res.status(404).json({success: false, message: err.message});
//      }
// }

const updateBooking = async (req: Request, res: Response) => {
    try{
        const {role, status} = req.body;
        const id = req.params.bookingId;
        if(role == "customer")
        {
            const result = await bookingService.updateBooking(id as string, status);
            res.status(200).json({success: true, message: "Booking cancelled successfully", data: result.rows[0]});
        }
        else if(role == "admin")
        {
              const result = await bookingService.updateBooking(id as string, status);
              res.status(200).json({success: true, message: "Booking marked as returned. Vehicle is now available", data: result.rows[0] });
        }
         
    }
    catch(err: any)
    {
        res.status(404).json({success: false, message: err.message});
    }
}

export const bookingController = {
    createBooking,
    getAllBokkings,
    updateBooking
}