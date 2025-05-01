import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tripRoutes from './routes/tripRoutes';
import destinationRoutes from './routes/destinationRoutes';

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const app = express();
const port = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/trips", tripRoutes);
app.use("/api/destinations", destinationRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Travel Planner API is running' });
}
);

app.listen(port, () => {
  console.log(`Backendserver running on http://localhost:${port}`);
});

export default app;