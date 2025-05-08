import * as destinationService from "../services/destinationService";
import prisma from "../utils/prisma";

describe("Destination Service", () => {
  let testDestinationId: number;

  beforeAll(async () => {
    const destination = await prisma.destination.create({
      data: {
        name: "Test Destination",
        description: "Test Description",
        activities: ["Hiking", "Swimming"],
        photos: ["photo1.jpg", "photo2.jpg"],
      },
    });
    testDestinationId = destination.id;
  });

  afterAll(async () => {
    await prisma.destination.deleteMany();
  });

  it("should fetch all destinations", async () => {
    const destinations = await destinationService.getAllDestinations();
    expect(destinations.length).toBeGreaterThan(0);
  });

  it("should fetch a destination by ID", async () => {
    const destination = await destinationService.getDestinationById(testDestinationId);
    expect(destination).toBeDefined();
    expect(destination?.name).toBe("Test Destination");
  });

  it("should create a new destination", async () => {
    const newDestination = await destinationService.createDestination({
      name: "New Destination",
      description: "New Description",
      activities: ["Skiing"],
      photos: ["photo3.jpg"],
    });
    expect(newDestination).toBeDefined();
    expect(newDestination.name).toBe("New Destination");
  });

  it("should update a destination", async () => {
    const updatedDestination = await destinationService.updateDestination(testDestinationId, {
      name: "Updated Destination",
    });
    expect(updatedDestination.name).toBe("Updated Destination");
  });

  it("should delete a destination", async () => {
    await destinationService.deleteDestination(testDestinationId);
    const destination = await destinationService.getDestinationById(testDestinationId);
    expect(destination).toBeNull();
  });
});