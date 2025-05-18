import prisma from '../utils/prisma';
import { z } from "zod";

const tripSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  activities: z.array(z.string()),
  photos: z.array(z.string()),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

const tripUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  activities: z.array(z.string()).optional(),
  photos: z.array(z.string()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
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
  return prisma.destination.create(
    {data: validatedData} // Erstellen des Reiseziels mit den validierten Daten
  );
};

export const searchDestinations = (name: string) => {
  const where: any = {};

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }
  return prisma.destination.findMany({where});
};

export const updateDestination = (id: number, data: any) => {
  const validatedData = tripUpdateSchema.parse(data); // Validierung der Eingabedaten
  return prisma.destination.update({
    where: { id },
    data: validatedData,
  });
};

export const deleteDestination = async (id: number) => {
  // Entferne alle Verknüpfungen zwischen Reisen und dem Reiseziel in der n:m-Tabelle
  await prisma.tripDestination.deleteMany({
    where: { destinationId: id },
  });

  // Lösche das Reiseziel
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