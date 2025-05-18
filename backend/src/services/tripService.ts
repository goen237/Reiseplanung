import prisma from '../utils/prisma';

// Trip Service: This file contains the functions to interact with the trip data in the database.
import { z } from "zod";

const tripSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid startDate format",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid endDate format",
  }),
  image: z.string().optional(),
  participants: z.array(z.string()),
});

export const getAllTrips = () => {
  return prisma.trip.findMany({ include: { destinations: true } });
};

export const getTripById = (id: number) => {
  return prisma.trip.findUnique({
    where: { id },
    include: { destinations: true },
  });
};



export const createTrip = (data: any) => {
  const validatedData = tripSchema.parse(data); // Validierung der Eingabedaten
  return prisma.trip.create({
    data: {
      ...validatedData,
      startDate: new Date(validatedData.startDate).toISOString(),
      endDate: new Date(validatedData.endDate).toISOString(),
    },
  });
};

export const updateTrip = (id: number, data: any) => {
  // Konvertiere die Datumsfelder in das ISO-8601-Format, falls sie vorhanden sind
  const updatedData = {
    ...data,
    ...(data.startDate && { startDate: new Date(data.startDate).toISOString() }),
    ...(data.endDate && { endDate: new Date(data.endDate).toISOString() }),
  };

  return prisma.trip.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteTrip = (id: number) => {
  return prisma.trip.delete({
    where: { id },
  });
};

export const addDestinationsToTrip = async (tripId: number, destinationIds: number[]) => {
  const data = destinationIds.map((destinationId) => ({
    tripId,
    destinationId,
  }));

  return prisma.tripDestination.createMany({
    data,
    skipDuplicates: true, // Avoid errors if some destinations are already linked
  });
};

export const removeDestinationFromTrip = (tripId: number, destinationId: number) => {
  return prisma.tripDestination.delete({
    where: {
      tripId_destinationId: {
        tripId,
        destinationId,
      },
    },
  });
};

export const searchTrips = (name?: string, date?: string) => {
  const where: any = {};

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (date) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      where.startDate = { lte: parsedDate.toISOString() }; // Konvertierung in ISO-8601
      where.endDate = { gte: parsedDate.toISOString() };  // Konvertierung in ISO-8601
    } else {
      throw new Error("Invalid date format. Expected ISO-8601 format.");
    }
  }

  return prisma.trip.findMany({ where });
};

export const archiveTrip = async (tripId: number, archived: boolean) => {
  return prisma.trip.update({
    where: { id: tripId },
    data: { archived },
  });
}

