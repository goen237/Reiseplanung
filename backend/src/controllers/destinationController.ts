import { Request, Response } from "express";
import * as destinationService from "../services/destinationService";

export const getAllDestinations = async (_req: Request, res: Response) => {
  const destinations = await destinationService.getAllDestinations();
  res.json(destinations);
};

export const getDestinationById = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({ error: "Missing destination ID" });
    return;
  }
  console.log("eingelesene ID", idParam)

  const id = parseInt(idParam);
  if(isNaN(id)) {
    res.status(400).json({ error: "Invalid destination ID" });
    return;
  }

  const destination = await destinationService.getDestinationById(id);
  if (!destination) {
    res.status(404).json({ error: "Destination not found" });
    return;
  }
  res.json(destination);
};

export const createDestination = async (req: Request, res: Response) => {
  const destination = await destinationService.createDestination(req.body);
  res.status(201).json(destination);
};

export const searchDestinations = async (req: Request, res: Response) => {
  const destinations = await destinationService.searchDestinations(req.query.name as string);
  res.json(destinations);
}

export const updateDestination = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const destination = await destinationService.updateDestination(id, req.body);
  res.json(destination);
};

export const deleteDestination = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await destinationService.deleteDestination(id);
  res.status(204).send();
};

export const getTripsByDestination = async (req: Request, res: Response): Promise<void> => {
    const destinationId = parseInt(req.params.id);
    const trips = await destinationService.getTripsByDestination(destinationId);
    res.json(trips);
  };

  export const getDestinationsByTripId = async (req: Request, res: Response): Promise<void> => {
    const tripId = parseInt(req.params.tripId);
    const destinations = await destinationService.getDestinationsByTripId(tripId);
    res.json(destinations);
  }