# 📘 FWE-SS-25-<1123807> – Reiseplaner – Dokumentation


## 🧭 Projektbeschreibung

Diese Anwendung dient der Planung und Organisation von Reisen. Benutzer können Reisen und Reisezielen verwalten, diese miteinander verknüpfen, durchsuchen und löschen. Sie wurde in zwei Teilen entwickelt:

- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Frontend**: Vite, React, TypeScript, Tailwind CSS

Sie erfüllt alle Anforderungen der FWE-Hausaufgaben 1 & 2.

## ⚙️ Tech Stack

- Node.js: Serverseitige JavaScript-Laufzeitumgebung.
- TypeScript: Typsicheres JavaScript für bessere Wartbarkeit.
- Express.js: Minimalistisches Webframework für Node.js.
- PostgreSQL: Relationale Datenbank.
- Prisma ORM: Datenbank-ORM für TypeScript.
- Jest + Supertest: Frameworks für automatisierte Tests.

## 📁 Projektstruktur

```
FWE-SS-25-1123807/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile.backend
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile.frontend
│   └── package.json
├── docker-compose.yml
```

---

## ⚙️ Technologien

- Node.js 20
- PostgreSQL 15
- Prisma ORM
- React 18 mit TypeScript
- Vite + Tailwind CSS
- Docker & Docker Compose

---

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

| Methode| Pfad                             | Beschreibung                      |
|--------|----------------------------------|-----------------------------------|
| GET    | `/api/trips`                     | Alle Reisen anzeigen              |
| GET    | `/api/trips/search?name=&date=`  | Reisen suchen (Name oder Datum)   |
| GET    | `/api/trips/:id`                 | Einzelne Reise anzeigen           |
| POST   | `/api/trips`                     | Neue Reise erstellen              |
| PUT    | `/api/trips/:id`                 | Reise bearbeiten                  |
| DELETE | `/api/trips/:id`                 | Reise löschen                     |
| POST   | `/api/trips/:id/destinations`    | Reiseziel zu Reise hinzufügen     |
| DELETE | `/api/trips/:id/destinations/:destinationId` | Reiseziel aus Reise entfernen |

### 🗺️ Destinations

| Methode | Pfad                           |Beschreibung                             |
|---------|--------------------------------|-----------------------------------------|
| GET     | `/api/destinations`            | Alle Reiseziele anzeigen                |
| GET     | `/api/destinations/search`     | Reiseziel suchen (name)                 |
| GET     | `/api/destinations/:id`        | Einzelnes Reiseziel anzeigen            |
| POST    | `/api/destinations`            | Neues Reiseziel erstellen               |
| PUT     | `/api/destinations/:id`        | Reiseziel bearbeiten                    |
| DELETE  | `/api/destinations/:id`        | Reiseziel löschen                       |
| GET     | `/api/destinations/:id/trips`  | Reisen zu einem Reiseziel anzeigen      |
| GET     | `/api/destinations/:id/trips/:tripId`  | Reiseziel zu einer reise anzeigen      |

## 🧪 Testen

1. **Tests ausführen**
```bash
npm run test
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
