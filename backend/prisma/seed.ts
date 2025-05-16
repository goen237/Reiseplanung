import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Beispiel: Reiseziele hinzufügen
  const destination1 = await prisma.destination.create({
    data: {
      name: "Paris",
      description: "Die Stadt der Liebe",
      activities: ["Eiffelturm besuchen", "Louvre erkunden"],
      photos: ["https://th.bing.com/th/id/R.4e312752589af6f4da3d6cf28e2f9775?rik=6XvqwkBl8ue5ew&riu=http%3a%2f%2fphotos.wikimapia.org%2fp%2f00%2f03%2f67%2f44%2f20_full.jpg&ehk=tZ93i9NWQQUrD9mGvJIMN0tkrsdq1m1xzNI%2bJhdcGys%3d&risl=&pid=ImgRaw&r=0", "https://th.bing.com/th/id/R.925c67e0635747e5b10130c50295ff38?rik=27diZ9TNaaVT4A&riu=http%3a%2f%2fwww.telegraph.co.uk%2fcontent%2fdam%2fvideo_previews%2fv%2f2%2fv2exl2nje6lsczqgxklf2mh1qjkhmfu-xlarge.jpg&ehk=4gWKelAF2mwAFkmtIrD1Dy2kGLgbkfL%2b03fMAXHdrf0%3d&risl=&pid=ImgRaw&r=0"],
    },
  });

  const destination2 = await prisma.destination.create({
    data: {
      name: "New York",
      description: "Die Stadt, die niemals schläft",
      activities: ["Times Square", "Central Park"],
      photos: ["https://th.bing.com/th/id/OIP.JdS0gRMOKp50OdrdPtnkpwHaE8?cb=iwc2&rs=1&pid=ImgDetMain", "https://th.bing.com/th?q=New+York+Liberty+Statue&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=de-DE&cc=DE&setlang=de&adlt=moderate&t=1&mw=247"],
    },
  });

  // Beispiel: Reisen hinzufügen
  const trip1 = await prisma.trip.create({
    data: {
      name: "Europa-Tour",
      description: "Eine unvergessliche Reise durch Europa",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-15"),
      participants: ["Alice", "Bob"],
    },
  });

  await prisma.tripDestination.create({
    data: {
      tripId: trip1.id, // ID der Reise
      destinationId: destination1.id, // ID des Reiseziels
    },
 });

  const trip2 = await prisma.trip.create({
    data: {
      name: "USA-Rundreise",
      description: "Entdecke die Highlights der USA",
      startDate: new Date("2025-07-01"),
      endDate: new Date("2025-07-20"),
      participants: ["Charlie", "Dave"],
    },
  });

  await prisma.tripDestination.create({
    data: {
      tripId: trip2.id, // ID der Reise
      destinationId: destination2.id, // ID des Reiseziels
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });