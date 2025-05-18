# 📘 FWE-SS-25-<1123807> – Reiseplaner – Dokumentation


## 🧭 Projektbeschreibung

Diese Anwendung dient der Planung und Organisation von Reisen. Benutzer können Reisen und Reisezielen verwalten, diese miteinander verknüpfen, durchsuchen und löschen. Sie wurde in zwei Teilen entwickelt:

- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Frontend**: Vite, React, TypeScript, Tailwind CSS

Sie erfüllt alle Anforderungen der FWE-Hausaufgaben 1 & 2.

## ⚙️ Tech Stack

- **Backend**:
  - Node.js 20
  - Express.js
  - Prisma ORM
  - PostgreSQL 15
- **Frontend**:
  - React 18 mit TypeScript
  - Vite + Tailwind CSS
- **Tools**:
  - Docker & Docker Compose
  - Jest + Supertest für Tests

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

## 🚀 Setup-Anleitung

1. **Repository klonen**
```bash
git clone <repository-url>
cd FWE-SS-25-1123807
```
/**
 * Hinweis: Die Dateien `.env.example` im Root-, Backend- und Frontend-Verzeichnis dienen als Vorlage für die benötigten Umgebungsvariablen.
 *
 * **Wichtig:** Bevor der Docker-Container gestartet wird, müssen Sie für jedes Verzeichnis eine eigene `.env`-Datei erstellen und die erforderlichen Umgebungsvariablen mit Ihren individuellen Werten ausfüllen.
 *
 * Beispielvorgehen:
 * 1. Kopieren Sie die jeweilige `.env.example`-Datei und benennen Sie sie in `.env` um.
 * 2. Tragen Sie Ihre spezifischen Konfigurationswerte in die `.env`-Dateien ein.
 * 3. Erst danach den Docker-Container starten.
 */

#### **2.1. Docker-Compose starten**
```bash
docker-compose up --build
```

- **Frontend**: Erreichbar unter `http://localhost:5173`
- **Backend**: Erreichbar unter `http://localhost:3000`
- **pgAdmin**: Erreichbar unter `http://localhost:8080`

#### **2.2. pgAdmin konfigurieren**
1. Melde dich bei pgAdmin an:
   - **E-Mail**: `admin@admin.com`
   - **Passwort**: `admin123`
2. Füge einen neuen Server hinzu:
   - **Host**: `db`
   - **Port**: `5432`
   - **Benutzername**: `user` (aus `.env`)
   - **Passwort**: `password` (aus `.env`)

#### **2.3. Prisma-Migrationen ausführen**
```bash
docker exec -it <backend-container-name> npx prisma migrate dev --name init

### **Beispiel: Migration im Backend-Container ausführen**

Angenommen, dein Backend-Container heißt `fwe-ss-25-1123807_backend_1`, führe folgenden Befehl aus:

```bash
docker exec -it fwe-ss-25-1123807_backend_1 npx prisma migrate dev --name init
```
```

---

## 🌱 Datenbank-Seeding (Beispieldaten einfügen)

Nach den Migrationen kannst du einmalig Beispieldaten in die Datenbank einfügen.

### **1. Seed-Skript im Docker-Container ausführen**

Führe folgenden Befehl aus, um das Seed-Skript im laufenden Backend-Container auszuführen:

```bash
docker-compose exec backend npm run seed
```

---

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

---

## 🧪 Testen

### **1. Tests ausführen**
```bash
docker exec -it <backend-container-name> npm run test
```
```bash
docker exec -it fwe-ss-25-1123807_backend_1 npm run test
```

### **2. Alternativ: API mit Postman oder cURL testen**
Beispiel:
```bash
curl http://localhost:3000/api/trips
```

---


## 🚀 Optional: Lokale Entwicklung ohne Docker

### **1. Backend starten**
1. **Wechsle ins Backend-Verzeichnis:**
   ```bash
   cd backend
   ```
2. **Abhängigkeiten installieren:**
   ```bash
   npm install -g pnpm
   ```
3. **Prisma-Migrationen ausführen:**
   ```bash
   npx prisma migrate dev --name init
   ```
4. **Server starten:**
   ```bash
   pnpm run start
   ```

### **2. Frontend starten**
1. **Wechsle ins Frontend-Verzeichnis:**
   ```bash
   cd frontend
   ```
2. **Abhängigkeiten installieren:**
   ```bash
   npm install -g pnpm
   pnpm install --frozen-lockfile
   ```
3. **Vite-Entwicklungsserver starten:**
   ```bash
   pnpm run dev
   ```

---

## 📦 Docker-Compose Übersicht

### **Dienste**
- **db**: PostgreSQL-Datenbank
- **backend**: Node.js-Backend mit Prisma
- **frontend**: React-Frontend mit Vite
- **pgadmin**: Verwaltungstool für PostgreSQL

### **Ports**
| Dienst     | Port       | Beschreibung                     |
|------------|------------|-----------------------------------|
| Frontend   | `5173`     | Vite-Entwicklungsserver          |
| Backend    | `3000`     | Express-API                      |
| PostgreSQL | `5432`     | Datenbank                        |
| pgAdmin    | `8080`     | Verwaltung der PostgreSQL-Datenbank |

---

## 📘 Hinweise

- **Docker-Volumes**:
  - `postgres_data`: Speichert die Datenbankdaten persistent.
  - `pgadmin_data`: Speichert die Konfiguration von pgAdmin.
- **Umgebungsvariablen**:
  - Stelle sicher, dass die `.env`-Dateien korrekt konfiguriert sind.

---

**Freestyle task #1**

## 🚀 Dashboard-Feature: Hinweis auf bevorstehende Reisen

Auf der Startseite (Dashboard) wird für jede Reise, deren Startdatum innerhalb der nächsten 7 Tage liegt, ein besonderer Hinweis angezeigt:

> 🚀 Deine Reise „Europa-Tour“ startet in 3 Tagen!

So werden Nutzer:innen rechtzeitig an anstehende Reisen erinnert.
Das Feature erkennt automatisch alle Reisen, die in den nächsten 7 Tagen beginnen, und hebt sie prominent hervor.

---

## 🗂️ Feature: Reisen archivieren

Du kannst Reisen manuell archivieren, um sie aus der Übersicht der aktiven Reisen auszublenden.
Archivierte Reisen werden in einem eigenen Bereich angezeigt und können jederzeit wiederhergestellt werden.

**Wie funktioniert das?**
- Jede Reise-Karte besitzt einen Button „Archivieren“.
- Nach dem Archivieren erscheint die Reise im Bereich „Archivierte Reisen“.
- Archivierte Reisen können über den Button „Wiederherstellen“ zurück in die aktive Übersicht verschoben werden.
- So behältst du den Überblick über vergangene, geplante und archivierte Reisen.

**Technische Umsetzung:**
- Das Feld `archived` im Datenmodell kennzeichnet archivierte Reisen.
- Die Archivierung wird direkt in der Datenbank gespeichert und ist somit persistent.

---

**Freestyle task #2**

## 🌦️ Wettervorhersage für Reiseziele (Open-Meteo API)

Für jedes Reiseziel wird im Detailbereich die Wettervorhersage für den Zeitraum der jeweiligen Reise angezeigt.
Die Wetterdaten (z. B. Tageshöchst- und -tiefsttemperatur, Wettersymbole) werden automatisch über die kostenlose [Open-Meteo API](https://open-meteo.com/) anhand der Koordinaten des Reiseziels und des geplanten Reisezeitraums abgerufen.

**Vorteile für Nutzer:innen:**
- Die Wettervorhersage ist direkt bei jedem Reiseziel sichtbar.
- Die Anzeige ist immer auf den Zeitraum der jeweiligen Reise abgestimmt.
- So kann die Reiseplanung und das Packen optimal vorbereitet werden.

**Technische Umsetzung:**
- Das Feature nutzt die Open-Meteo-API (ohne API-Key).
- Die Koordinaten (`latitude`, `longitude`) werden im Datenmodell für jedes Reiseziel gespeichert.
- Die Wetterdaten werden im Frontend dynamisch für den Zeitraum der aktuellen Reise geladen und angezeigt.

**Beispielanzeige:**

🌦️ Wettervorhersage 01.06.2025: ☀️ 23°C / 13°C 02.06.2025: 🌤️ 21°C / 12°C 03.06.2025: 🌧️ 18°C / 11°C ...