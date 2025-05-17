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
      image: "https://th.bing.com/th/id/OIP.ljTAnFFlggazELQAW2NqXgHaHa?w=217&h=216&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3",
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
      image: "https://th.bing.com/th/id/OIP.DONfxYKEe0cZOLuIqON4sQHaDQ?o=7&cb=iwp2rm=3&w=817&h=360&rs=1&pid=ImgDetMain",
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

  const moreDestinations = await prisma.destination.createMany({
    data: [
      {
        name: "Rom",
        description: "Die ewige Stadt mit antiker Geschichte",
        activities: ["Kolosseum besichtigen", "Vatikan besuchen"],
        photos: [
          "https://th.bing.com/th/id/R.1e0e7e2e2b8c6e2e2e2e2e2e2e2e2e2e?rik=rome1&pid=ImgRaw&r=0",
          "https://th.bing.com/th/id/OIP.rome2?pid=ImgDetMain"
        ]
      },
      {
        name: "Tokio",
        description: "Die pulsierende Hauptstadt Japans",
        activities: ["Shibuya Crossing", "Meiji-Schrein"],
        photos: [
          "https://th.bing.com/th/id/OIP.tokyo1?pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.tokyo2?pid=ImgDetMain"
        ]
      },
      {
        name: "Sydney",
        description: "Australiens berühmte Hafenstadt",
        activities: ["Opernhaus besuchen", "Bondi Beach"],
        photos: [
          "https://th.bing.com/th/id/OIP.sydney1?pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.sydney2?pid=ImgDetMain"
        ]
      },
      {
        name: "Kapstadt",
        description: "Die Perle Südafrikas am Tafelberg",
        activities: ["Tafelberg besteigen", "Robben Island"],
        photos: [
          "https://th.bing.com/th/id/OIP.capetown1?pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.capetown2?pid=ImgDetMain"
        ]
      },
      {
        name: "Rio de Janeiro",
        description: "Die Stadt des Karnevals",
        activities: ["Christusstatue", "Copacabana"],
        photos: [
          "https://th.bing.com/th/id/OIP.rio1?pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.rio2?pid=ImgDetMain"
        ]
      },
      {
        name: "Kairo",
        description: "Das Tor zu den Pyramiden",
        activities: ["Pyramiden von Gizeh", "Ägyptisches Museum"],
        photos: [
          "https://th.bing.com/th/id/OIP.cairo1?pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.cairo2?pid=ImgDetMain"
        ]
      },
      {
        name: "Barcelona",
        description: "Die Stadt Gaudís und des Strandes",
        activities: ["Sagrada Familia", "La Rambla"],
        photos: [
          "https://th.bing.com/th/id/OIP.barcelona1?pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.barcelona2?pid=ImgDetMain"
        ]
      },
      {
        name: "Bangkok",
        description: "Thailands lebendige Hauptstadt",
        activities: ["Großer Palast", "Streetfood probieren"],
        photos: [
          "https://th.bing.com/th/id/OIP.bangkok1?pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.bangkok2?pid=ImgDetMain"
        ]
      }
    ]
  });

  const moreTrips = await prisma.trip.createMany({
    data: [
      {
        name: "Asien-Abenteuer",
        description: "Eine Reise durch die faszinierendsten Städte Asiens",
        image: "https://th.bing.com/th/id/OIP.asia1?pid=ImgDetMain",
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-08-20"),
        participants: ["Eve", "Frank"]
      },
      {
        name: "Afrika-Entdeckung",
        description: "Safari und Kultur in Afrika erleben",
        image: "https://th.bing.com/th/id/OIP.africa1?pid=ImgDetMain",
        startDate: new Date("2025-09-10"),
        endDate: new Date("2025-09-25"),
        participants: ["Grace", "Heidi"]
      },
      {
        name: "Australien-Rundreise",
        description: "Von Sydney bis zum Great Barrier Reef",
        image: "https://th.bing.com/th/id/OIP.australia1?pid=ImgDetMain",
        startDate: new Date("2025-10-05"),
        endDate: new Date("2025-10-25"),
        participants: ["Ivan", "Judy"]
      },
      {
        name: "Südamerika-Highlights",
        description: "Von Rio bis zu den Anden",
        image: "https://th.bing.com/th/id/OIP.southamerica1?pid=ImgDetMain",
        startDate: new Date("2025-11-01"),
        endDate: new Date("2025-11-18"),
        participants: ["Karl", "Lena"]
      },
      {
        name: "Mittelmeer-Kreuzfahrt",
        description: "Entdecke die schönsten Städte am Mittelmeer",
        image: "https://th.bing.com/th/id/OIP.mediterranean1?pid=ImgDetMain",
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-10"),
        participants: ["Mona", "Nico"]
      }
    ]
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