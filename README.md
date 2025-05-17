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

### **2. Alternativ: API mit Postman oder cURL testen**
Beispiel:
```bash
curl http://localhost:3000/api/trips
```

---


---

## 🚀 Optional: Lokale Entwicklung ohne Docker

### **1. Backend starten**
1. **Wechsle ins Backend-Verzeichnis:**
   ```bash
   cd backend
   ```
2. **Abhängigkeiten installieren:**
   ```bash
   pnpm install
   ```
3. **Prisma-Migrationen ausführen:**
   ```bash
   npx prisma migrate dev --name init
   ```
4. **Server starten:**
   ```bash
   pnpm run dev
   ```

### **2. Frontend starten**
1. **Wechsle ins Frontend-Verzeichnis:**
   ```bash
   cd frontend
   ```
2. **Abhängigkeiten installieren:**
   ```bash
   pnpm install
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

