import request from 'supertest';
import prisma from '../utils/prisma';
import app from "../index";

let tripId: number;
let destinationId: number;

beforeAll(async () => {
  await prisma.trip.deleteMany();
  await prisma.destination.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Trips API", () => {
  it("should create a new trip", async () => {
    const res = await request(app).post("/api/trips").send({
      name: "Testreise",
      description: "Beschreibung",
      startDate: "2025-05-01T00:00:00.000Z",
      endDate: "2025-05-10T00:00:00.000Z",
      participants: ["Anna", "Tom"],
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Testreise");
    tripId = res.body.id;
  });

  it("should get all trips", async () => {
    const res = await request(app).get("/api/trips");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should update a trip", async () => {
    const res = await request(app).put(`/api/trips/${tripId}`).send({
      name: "Geänderte Reise",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Geänderte Reise");
  });

  it("should get trip by id", async () => {
    const res = await request(app).get(`/api/trips/${tripId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(tripId);
  });
});

describe("Destinations API", () => {
  it("should create a new destination", async () => {
    const res = await request(app).post("/api/destinations").send({
      name: "Rom",
      description: "Stadt der Antike",
      activities: ["Kolosseum", "Vatikane"],
      photos: ["http://image.com/rom.jpg"],
    });
    expect(res.statusCode).toBe(201);
    destinationId = res.body.id;
  });

  it("should update a destination", async () => {
    const res = await request(app).put(`/api/destinations/${destinationId}`).send({
      name: "Rom - Aktualisiert",
      description: "Aktualisierte Beschreibung",
      activities: ["Kolosseum", "Vatikanische Museen"],
      photos: ["http://image.com/rom-updated.jpg"],
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Rom - Aktualisiert");
    expect(res.body.description).toBe("Aktualisierte Beschreibung");
  });


  it("should assign destinations to trip", async () => {
    const res = await request(app)
      .post(`/api/trips/${tripId}/destinations`)
      .send({ destinationIds: [destinationId] });
    expect(res.statusCode).toBe(201);
  });

  it("should list trips by destination", async () => {
    const res = await request(app).get(`/api/destinations/${destinationId}/trips`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should search trips by name", async () => {
    const res = await request(app).get("/api/trips/search?name=Geänderte");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toContain("Geändert");
  });

  it("should search trips by date", async () => {
    const res = await request(app).get("/api/trips/search?date=2025-05-03");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should remove destination from trip", async () => {
    const res = await request(app).delete(
      `/api/trips/${tripId}/destinations/${destinationId}`
    );
    expect(res.statusCode).toBe(204);
  });

  it("should delete destination", async () => {
    const res = await request(app).delete(`/api/destinations/${destinationId}`);
    expect(res.statusCode).toBe(204);
  });

  it("should delete trip", async () => {
    const res = await request(app).delete(`/api/trips/${tripId}`);
    expect(res.statusCode).toBe(204);
  });
});
