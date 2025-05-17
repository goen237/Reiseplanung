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
      photos: [
        "https://cdn.getyourguide.com/img/location/5ffeb39946966.jpeg/88.jpg",
        "https://img.oastatic.com/img2/18486191/max/der-haupteingang-des-louvre-museums.jpg"
      ],
    },
  });

  const destination2 = await prisma.destination.create({
    data: {
      name: "New York",
      description: "Die Stadt, die niemals schläft",
      activities: ["Times Square", "Central Park"],
      photos: [
        "https://th.bing.com/th/id/OIP.JdS0gRMOKp50OdrdPtnkpwHaE8?cb=iwc2&rs=1&pid=ImgDetMain",
        "https://th.bing.com/th?q=New+York+Liberty+Statue&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=de-DE&cc=DE&setlang=de&adlt=moderate&t=1&mw=247"
      ],
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
          "https://tse3.mm.bing.net/th/id/OIP.nnb8DfOgdM8twfTbhdYXZgHaE8?w=299&h=200&c=7&r=0&o=5&pid=1.7",
          "https://tse2.mm.bing.net/th/id/OIP.MeDVoqgi1hZfmZz3UwVDOwHaE8?w=253&h=180&c=7&r=0&o=5&pid=1.7"
        ]
      },
      {
        name: "Tokio",
        description: "Die pulsierende Hauptstadt Japans",
        activities: ["Shibuya Crossing", "Meiji-Schrein"],
        photos: [
          "https://image.freepik.com/free-photo/shibuya-crossing-from-top-view-night-tokyo-japan_255553-674.jpg?w=1800",
          "https://i.pinimg.com/originals/bc/12/a8/bc12a843cecc82de226aacacde2f79c0.jpg"
        ]
      },
      {
        name: "Sydney",
        description: "Australiens berühmte Hafenstadt",
        activities: ["Opernhaus besuchen", "Bondi Beach"],
        photos: [
          "https://www.thoughtco.com/thmb/hssf0x9k0wghn0zwi5LT9x9TQc4=/2000x1340/filters:fill(auto,1)/utzonSOH-821907-56aadd173df78cf772b49827.jpg",
          "https://th.bing.com/th/id/R.086967ab6350141eebd751777a01dd7e?rik=ST5BuLtdD1cWnw&pid=ImgRaw&r=0"
        ]
      },
      {
        name: "Kapstadt",
        description: "Die Perle Südafrikas am Tafelberg",
        activities: ["Tafelberg besteigen", "Robben Island"],
        photos: [
          "https://image.geo.de/30080722/t/Gu/v4/w960/r0/-/naturphaenomene-gross-07-jpg--38372-.jpg",
          "https://th.bing.com/th/id/R.0487790a0f4224aacae3a57648fc6b2f?rik=VfBBp8DAvfXZaQ&pid=ImgRaw&r=0"
        ]
      },
      {
        name: "Rio de Janeiro",
        description: "Die Stadt des Karnevals",
        activities: ["Christusstatue", "Copacabana"],
        photos: [
          "https://th.bing.com/th/id/OIP.vwOHe25XxL-HSSgqXP4EVwHaEK?r=0&rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.QeuOekeBfqCUcobhZry_HQHaE7?r=0&rs=1&pid=ImgDetMain"
        ]
      },
      {
        name: "Kairo",
        description: "Das Tor zu den Pyramiden",
        activities: ["Pyramiden von Gizeh", "Ägyptisches Museum"],
        photos: [
          "https://th.bing.com/th/id/OIP.ILG8pD65iiguEQMV0Y-xhAHaEA?r=0&rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.WrAJKiyLAZjk3JZaHXMfPwHaE8?r=0&rs=1&pid=ImgDetMain"
        ]
      },
      {
        name: "Barcelona",
        description: "Die Stadt Gaudís und des Strandes",
        activities: ["Sagrada Familia", "La Rambla"],
        photos: [
          "https://th.bing.com/th/id/OIP.Awr5hDY2YVG1xIuxN-vloAHaF-?r=0&rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/R.ec09a0926e0b6004c7b13ecc52b141ca?rik=jrlnPPj94hyyuw&pid=ImgRaw&r=0"
        ]
      },
      {
        name: "Bangkok",
        description: "Thailands lebendige Hauptstadt",
        activities: ["Großer Palast", "Streetfood probieren"],
        photos: [
          "https://th.bing.com/th/id/OIP._ulJ92IVBs8JSYhgpsLObgHaE8?r=0&rs=1&pid=ImgDetMain",
          "https://www.thishomemadelife.com/wp-content/uploads/2019/11/shu-Taiwan-Taipei-Market-Stall-1176689317-1440x823.jpg"
        ]
      }
    ]
  });

  const moreTrips = await prisma.trip.createMany({
    data: [
      {
        name: "Asien-Abenteuer",
        description: "Eine Reise durch die faszinierendsten Städte Asiens",
        image: "https://th.bing.com/th/id/R.df4606d65493675d5a85503e7cbcd895?rik=z9v0WDsANMQmIA&pid=ImgRaw&r=0",
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-08-20"),
        participants: ["Eve", "Frank"]
      },
      {
        name: "Afrika-Entdeckung",
        description: "Safari und Kultur in Afrika erleben",
        image: "https://th.bing.com/th/id/OIP.v7BJBjUORWqlcI33BeH3dgHaE8?r=0&rs=1&pid=ImgDetMain",
        startDate: new Date("2025-09-10"),
        endDate: new Date("2025-09-25"),
        participants: ["Grace", "Heidi"]
      },
      {
        name: "Australien-Rundreise",
        description: "Von Sydney bis zum Great Barrier Reef",
        image: "https://th.bing.com/th/id/OIP.DeBY8-DJnHo-wlNGYa9DPwHaFS?w=278&h=199&c=7&r=0&o=5&pid=1.7",
        startDate: new Date("2025-10-05"),
        endDate: new Date("2025-10-25"),
        participants: ["Ivan", "Judy"]
      },
      {
        name: "Südamerika-Highlights",
        description: "Von Rio bis zu den Anden",
        image: "https://www.reise.de/wp-content/uploads/sites/16/Machu-Picchu-960x550-center-center.jpg",
        startDate: new Date("2025-11-01"),
        endDate: new Date("2025-11-18"),
        participants: ["Karl", "Lena"]
      },
      {
        name: "Mittelmeer-Kreuzfahrt",
        description: "Entdecke die schönsten Städte am Mittelmeer",
        image: "https://th.bing.com/th/id/R.23b6018ec8a740dc3a10151337b27996?rik=zuHvn4IPKOP7XQ&pid=ImgRaw&r=0",
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