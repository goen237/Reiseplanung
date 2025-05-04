# 📘 FWE-SS-25-<1123807> – Backend

## 🧭 Projektbeschreibung

Diese Anwendung dient der Planung und Organisation von Reisen. Benutzer können Reisen und Reisezielen verwalten, diese miteinander verknüpfen, durchsuchen und löschen. Die API ist ein reines Backend-System auf Basis von **Node.js, TypeScript, Express und PostgreSQL (via Prisma ORM)**.

## ⚙️ Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Jest + Supertest (für automatisierte Tests)

## 📁 Projektstruktur

```
├── src/
│   ├── controllers/        # Routen-Logik
│   ├── services/           # Geschäftslogik
│   ├── routes/             # API-Routen
│   ├── server.ts           # Einstiegspunkt
├── prisma/
│   ├── schema.prisma       # Datenbankmodell
│   └── migrations/         # Migrationen
├── tests/                  # Automatisierte Tests
├── .env                    # Umgebungsvariablen
├── package.json
├── README.md
```

## 🚀 Setup-Anleitung

1. **Repository klonen**
```bash
git clone <repository-url>
cd <FWE-SS-25>
```

2. **Abhängigkeiten installieren**
```bash
npm install
```

3. **.env Datei erstellen**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/deine_db"
PORT=3000
```

4. **Datenbank vorbereiten**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. **Server starten**
```bash
npm run dev
```

## 🔌 API-Routen

### 📍 Trips

| Methode | Pfad                            | Beschreibung                      |
|--------|----------------------------------|-----------------------------------|
| GET    | `/api/trips`                     | Alle Reisen anzeigen              |
| GET    | `/api/trips/:id`                 | Einzelne Reise anzeigen           |
| POST   | `/api/trips`                     | Neue Reise erstellen              |
| PUT    | `/api/trips/:id`                 | Reise bearbeiten                  |
| DELETE | `/api/trips/:id`                 | Reise löschen                     |
| GET    | `/api/trips/search?name=&date=`  | Reisen suchen (Name oder Datum)   |
| POST   | `/api/trips/:id/destinations`    | Reiseziel zu Reise hinzufügen     |
| DELETE | `/api/trips/:id/destinations/:destinationId` | Reiseziel aus Reise entfernen |

### 🗺️ Destinations

| Methode | Pfad                           |Beschreibung                             |
|---------|--------------------------------|-----------------------------------------|
| GET     | `/api/destinations`            | Alle Reiseziele anzeigen                |
| GET     | `/api/destinations/:id`        | Einzelnes Reiseziel anzeigen            |
| POST    | `/api/destinations`            | Neues Reiseziel erstellen               |
| PUT     | `/api/destinations/:id`        | Reiseziel bearbeiten                    |
| DELETE  | `/api/destinations/:id`        | Reiseziel löschen                       |
| GET     | `/api/destinations/:id/trips`  | Reisen zu einem Reiseziel anzeigen      |

## 🧪 Testen

1. **Tests ausführen**
```bash
npx jest
```

2. Alternativ: API mit Postman oder cURL testen
   Beispiel:
```bash
curl http://localhost:3000/api/trips
```

## 🎯 Abdeckung aller Anforderungen

- [x] CRUD für Reisen & Reiseziele
- [x] Verknüpfung von Reisezielen mit Reisen (n:m)
- [x] Suche nach Reisen über Name und Datum
- [x] Ausgabe aller Reisen, die ein bestimmtes Reiseziel beinhalten
- [x] Automatisierte Tests
- [x] Strukturierte README.md
- [x] Einheitlicher, kommentierter Code (TypeScript)

## 🚀 Optional: Docker Setup (nicht erforderlich)
<Optionaler Hinweis, falls du Docker nutzt>
