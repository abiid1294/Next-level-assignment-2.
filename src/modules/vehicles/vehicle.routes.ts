import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middlewdare/auth";
const router = Router();

router.post("/", auth("admin"), vehicleController.createVehicle);

router.get("/", vehicleController.getAllVehicle);
router.get("/:vehicleId", vehicleController.getVehicleById);

router.put("/:vehicleId", auth("admin"), vehicleController.updateVehicle);
router.delete("/vehicleId",auth("admin"), vehicleController.deleteVehicle);


export const vehicleRouter = router;