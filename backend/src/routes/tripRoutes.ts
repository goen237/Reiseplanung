import { Router } from "express";
import * as tripController from "../controllers/tripController";

const router = Router();

router.get("/", tripController.getAllTrips);
router.get("/search", tripController.searchTrips);
router.get("/:id", tripController.getTripById);
router.post("/", tripController.createTrip);
router.put("/:id", tripController.updateTrip);
router.patch("/:id/archive", tripController.archiveTrip);
router.delete("/:id", tripController.deleteTrip);
router.post("/:id/destinations", tripController.addDestinationsToTrip);
router.delete("/:id/destinations/:destinationId", tripController.removeDestinationFromTrip);

export default router;
