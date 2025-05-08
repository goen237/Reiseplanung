import * as tripService from "../services/tripService";
import prisma from "../utils/prisma";

describe("Trip Service", () => {
  let testTripId: number;

  beforeAll(async () => {
    const trip = await prisma.trip.create({
      data: {
        name: "Test Trip",
        description: "Test Description",
        startDate: new Date(),
        endDate: new Date(),
        participants: ["Alice", "Bob"],
      },
    });
    testTripId = trip.id;
  });

  afterAll(async () => {
    await prisma.trip.deleteMany();
  });

  it("should fetch all trips", async () => {
    const trips = await tripService.getAllTrips();
    expect(trips.length).toBeGreaterThan(0);
  });

  it("should fetch a trip by ID", async () => {
    const trip = await tripService.getTripById(testTripId);
    expect(trip).toBeDefined();
    expect(trip?.name).toBe("Test Trip");
  });

  it("should create a new trip", async () => {
    const newTrip = await tripService.createTrip({
      name: "New Trip",
      description: "New Description",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      participants: ["Charlie"],
    });
    expect(newTrip).toBeDefined();
    expect(newTrip.name).toBe("New Trip");
  });

  it("should update a trip", async () => {
    const updatedTrip = await tripService.updateTrip(testTripId, {
      name: "Updated Trip",
    });
    expect(updatedTrip.name).toBe("Updated Trip");
  });

  it("should delete a trip", async () => {
    await tripService.deleteTrip(testTripId);
    const trip = await tripService.getTripById(testTripId);
    expect(trip).toBeNull();
  });
});