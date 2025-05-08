import { Router } from "express";
import * as destinationController from "../controllers/destinationController";

const router = Router();

router.get("/", destinationController.getAllDestinations);
router.get("/search", destinationController.searchDestinations);
router.get("/:id", destinationController.getDestinationById);
router.post("/", destinationController.createDestination);
router.put("/:id", destinationController.updateDestination);
router.delete("/:id", destinationController.deleteDestination);
router.get("/:id/trips", destinationController.getTripsByDestination);
router.get("/trips/:tripId", destinationController.getDestinationsByTripId);


export default router;
