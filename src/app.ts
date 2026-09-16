import express from "express";
import { userRouter } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { vehicleRouter } from "./modules/vehicles/vehicle.routes";
import { bookingRouter } from "./modules/bookings/bookings.routes";
const app = express();

// body parser
app.use(express.json); 


// user routes
app.use("/api/v1/users", userRouter);

// auth routes
app.use("/api/v1/auth", authRouter);

// vehicle routes
app.use("/api/v1/vehicles", vehicleRouter);

// booking routes
app.use("/api/v1/bookings",bookingRouter);


export default app;