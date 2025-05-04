import prisma from '../utils/prisma';
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
  activities: z.array(z.string()),
  photos: z.array(z.string()),

});

export const getAllDestinations = () => {
  return prisma.destination.findMany({ include: { trips: true } });
};

export const getDestinationById = (id: number) => {
  return prisma.destination.findUnique({
    where: { id },
    include: { trips: true },
  });
};

export const createDestination = (data: any) => {
  const validatedData = tripSchema.parse(data); // Validierung der Eingabedaten
  return prisma.destination.create({
    data: {
      ...validatedData,
      startDate: new Date(validatedData.startDate).toISOString(),
      endDate: new Date(validatedData.endDate).toISOString(),
    },
  });
};

export const updateDestination = (id: number, data: any) => {
  const updatedData = {
    ...data,
    ...(data.startDate && { startDate: new Date(data.startDate).toISOString() }),
    ...(data.endDate && { endDate: new Date(data.endDate).toISOString() }),
  };

  return prisma.destination.update({
    where: { id },
    data,
  });
};

export const deleteDestination = (id: number) => {
  return prisma.destination.delete({
    where: { id },
  });
};

export const getTripsByDestination = (destinationId: number) => {
    return prisma.trip.findMany({
      where: {
        destinations: {
          some: {
            destinationId,
          },
        },
      },
      include: {
        destinations: true,
      },
    });
  };

export const getDestinationsByTripId = async (tripId: number) => {
  try {
    return await prisma.destination.findMany({
      where: {
        trips: {
          some: {
            tripId,
          },
        },
      },
      include: {
        trips: true,
      },
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw new Error("Could not fetch destinations");
  }
};