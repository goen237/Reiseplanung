import prisma from '../utils/prisma';

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
  return prisma.destination.create({ data });
};

export const updateDestination = (id: number, data: any) => {
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

