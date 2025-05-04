import { Request, Response } from "express";
import * as tripService from "../services/tripService";

export const getAllTrips = async (_req: Request, res: Response) => {
  const trips = await tripService.getAllTrips();
  res.json(trips);
};

// tripController.ts
export const getTripById = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({ error: "Missing trip ID" });
    return;
  }

  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid trip ID" });
    return;
  }

  const trip = await tripService.getTripById(id);
  if (!trip) {
    res.status(404).json({ error: "Trip not found" });
    return;
  }

  res.json(trip);
};



export const createTrip = async (req: Request, res: Response) => {
  const trip = await tripService.createTrip(req.body);
  res.status(201).json(trip);
};

export const updateTrip = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const trip = await tripService.updateTrip(id, req.body);
  res.json(trip);
};

export const deleteTrip = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await tripService.deleteTrip(id);
  res.status(204).send();
};

export const addDestinationToTrip = async (req: Request, res: Response): Promise<void> => {
  const tripId = parseInt(req.params.id);
  const { destinationId } = req.body;
  const result = await tripService.addDestinationToTrip(tripId, destinationId);
  res.status(201).json(result);
};

export const removeDestinationFromTrip = async (req: Request, res: Response): Promise<void> => {
  const tripId = parseInt(req.params.id);
  const destinationId = parseInt(req.params.destinationId);
  await tripService.removeDestinationFromTrip(tripId, destinationId);
  res.status(204).send();
};

// export const searchTrips = async (req: Request, res: Response): Promise<void> => {
//   const { name, date } = req.query;

//   const results = await tripService.searchTrips(
//     typeof name === "string" ? name : undefined,
//     typeof date === "string" ? new Date(date) : undefined
//   );

//   res.json(results);
// };

export const searchTrips = async (req: Request, res: Response) => {
  const results = await tripService.searchTrips(req.query.name as string, req.query.date as string);
  res.json(results);
}
