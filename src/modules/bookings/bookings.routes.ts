import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middlewdare/auth";
const router = Router();

router.post("/", auth("admin","customer"), bookingController.createBooking);

router.get("/", auth("admin", "customer"), bookingController.getAllBokkings);
//router.get("/:bookingId",auth("customer"),bookingController.getAllBookingsById);

router.put("/:bookingId",auth("customer","admin"), bookingController.updateBooking);
export const bookingRouter = router;