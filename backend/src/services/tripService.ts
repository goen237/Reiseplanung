import prisma from '../utils/prisma';

// Trip Service: This file contains the functions to interact with the trip data in the database.

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
  return prisma.trip.create({ data });
};

export const updateTrip = (id: number, data: any) => {
  return prisma.trip.update({
    where: { id },
    data,
  });
};

export const deleteTrip = (id: number) => {
  return prisma.trip.delete({
    where: { id },
  });
};

export const addDestinationToTrip = (tripId: number, destinationId: number) => {
  return prisma.tripDestination.create({
    data: {
      tripId,
      destinationId,
    },
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
    where.startDate = { lte: date };
    where.endDate = { gte: date };
  }

  return prisma.trip.findMany({ where });
};



// import prisma from '../utils/prisma';

// const getAll = () => {
//   return prisma.trip.findMany({ include: { destinations: { include: { destination: true } } } });
// };

// const getById = (id: number) => {
//   if (!id || typeof id !== 'number') {
//     throw new Error('Invalid id: id must be a number');
//   }
//   return prisma.trip.findUnique({
//     where: { id },
//     include: { destinations: { include: { destination: true } } }
//   });
// };

// const create = (data: any) => {
//   return prisma.trip.create({ data });
// };

// const update = (id: number, data: any) => {
//   return prisma.trip.update({ where: { id }, data });
// };

// const deleteTrip = (id: number) => {
//   return prisma.trip.delete({ where: { id } });
// };


// const search = (name?: string, date?: string) => {
//   const filters: Record<string, any>[] = [];
//   if (name) {
//     filters.push({ name: { contains: name, mode: 'insensitive' } });
//   }
//   if (date) {
//     const parsedDate = new Date(date);
//     if (isNaN(parsedDate.getTime())) {
//       throw new Error('Invalid date format');
//     }
//     filters.push({
//       OR: [
//         { startDate: { lte: parsedDate } },
//         { endDate: { gte: parsedDate } }
//       ]
//     });
//   }
//   return prisma.trip.findMany({
//     where: {
//       AND: filters
//     },
//     include: {
//       destinations: { include: { destination: true } }
//     }
//   });
// };

// const getByDestination = (destinationId: number) => {
//   return prisma.trip.findMany({
//     where: {
//       destinations: {
//         some: { destinationId }
//       }
//     },
//     include: {
//       destinations: { include: { destination: true } }
//     }
//   });
// };

// const addDestination = (tripId: number, destinationId: number) => {
//   return prisma.tripDestination.create({
//     data: { tripId, destinationId }
//   });
// };

// const removeDestination = (tripId: number, destinationId: number) => {
//   return prisma.tripDestination.delete({
//     where: { tripId_destinationId: { tripId, destinationId } }
//   });
// };

// export default {
//   getAll,
//   getById,
//   create,
//   update,
//   delete: deleteTrip,
//   search,
//   getByDestination,
//   addDestination,
//   removeDestination
// };
